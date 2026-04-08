<script>
  import { onMount, onDestroy } from "svelte";
  import {
    createMap,
    defaultStyle,
    activeStyle,
    makeFeature,
    drawLine,
  } from "./map.js";
  import {
    filteredItems,
    hoveredItem,
    itemDistances,
    selectedItem,
    visibleItems,
  } from "./stores.js";
  import { fromLonLat, toLonLat } from "ol/proj";

  let container;
  let map;
  let vectorSource;
  let vectorLayer;

  hoveredItem.subscribe((hovered) => {
    if (!map) return;

    if (!hovered) return drawLine();
    drawLine(toLonLat(map.getView().getCenter()), [
      hovered.Location.Longitude,
      hovered.Location.Latitude,
    ]);

    // drawLine([0, 0], [10, 10]);
  });

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

  // function featuresInView() {
  //   return vectorSource
  //     .getFeaturesInExtent(map.getView().calculateExtent(map.getSize()))
  //     .map((feature) => (feature ? feature.get("item") : null));
  // }

  import { getDistance } from "ol/sphere";

  function featuresInView() {
    const extent = map.getView().calculateExtent(map.getSize());
    const center = map.getView().getCenter();

    // Transform center to lon/lat if your map is in EPSG:3857
    const centerLonLat = toLonLat(center);

    const data = vectorSource
      .getFeaturesInExtent(extent)
      .map((f) => {
        const closest = f.getGeometry().getClosestPoint(center);
        const closestLonLat = toLonLat(closest);
        const distance = getDistance(centerLonLat, closestLonLat); // meters
        return { item: f.get("item"), distance };
      })
      .filter((f) => f.item)
      .sort((a, b) => a.distance - b.distance);

    const items = data.map((f) => f.item);
    const distances = data.map((f) => f.distance);

    return [items, distances];
  }

  onMount(() => {
    ({ map, vectorSource, vectorLayer } = createMap(container));

    map.on("click", (e) => {
      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);
      selectedItem.set(feature ? feature.get("item") : null);
      // console.log(feature.get("item"));
    });

    map.on("pointermove", (e) => {
      const hit = map.hasFeatureAtPixel(e.pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    map.on("moveend", () => {
      let [items, distances] = featuresInView();

      $visibleItems = items;
      $itemDistances = distances;
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
