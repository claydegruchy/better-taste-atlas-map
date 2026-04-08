<script>
  import { onMount, onDestroy } from "svelte";
  import { createMap, defaultStyle, activeStyle, makeFeature } from "./map.js";
  import { filteredItems, selectedItem } from "./stores.js";
  import { fromLonLat } from "ol/proj";

  let container;
  let map;
  let vectorSource;
  let vectorLayer;

  function renderFeatures(items) {
    if (!vectorSource) return;

    const newIds = new Set(items.map((i) => i.FId));

    // Remove stale features
    for (const f of vectorSource.getFeatures()) {
      if (!newIds.has(f.getId())) vectorSource.removeFeature(f);
    }

    // Add new features
    const existingIds = new Set(
      vectorSource.getFeatures().map((f) => f.getId()),
    );
    for (const item of items) {
      if (existingIds.has(item.FId)) continue;
      if (!item.Location?.Latitude || !item.Location?.Longitude) continue;
      vectorSource.addFeature(makeFeature(item));
    }
  }

  function updateActiveFeature(active) {
    if (!vectorSource) return;
    for (const f of vectorSource.getFeatures()) {
      f.setStyle(
        active && f.getId() === active.FId ? activeStyle() : defaultStyle(),
      );
    }
    if (active) {
      map.getView().animate({
        center: fromLonLat([
          active.Location.Longitude,
          active.Location.Latitude,
        ]),
        duration: 300,
      });
    }
  }

  onMount(() => {
    ({ map, vectorSource, vectorLayer } = createMap(container));

    map.on("click", (e) => {
      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);
      selectedItem.set(feature ? feature.get("item") : null);
    });

    map.on("pointermove", (e) => {
      const hit = map.hasFeatureAtPixel(e.pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    renderFeatures($filteredItems);
  });

  onDestroy(() => {
    if (map) map.setTarget(null);
  });

  $: if (vectorSource) renderFeatures($filteredItems);
  $: updateActiveFeature($selectedItem);
</script>

<div bind:this={container} class="map" />

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
