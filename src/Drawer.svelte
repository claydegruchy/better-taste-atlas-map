<script>
  import {
    hoveredItem,
    itemDistances,
    selectedItem,
    visibleItems,
  } from "./stores.js";

  const BASE_URL = "https://www.tasteatlas.com";

  function hover(item) {
    $hoveredItem = item;
  }
  function select(item) {
    $selectedItem = item;
  }
</script>

<aside class="drawer">
  {#if $selectedItem}
    <div class="item-view">
      <button
        class="close"
        on:click={() => selectedItem.set(null)}
        aria-label="Close">✕</button
      >

      <dir class="info-collection">
        {#if $selectedItem.Image}
          <img
            src="{BASE_URL}{$selectedItem.Image}"
            alt={$selectedItem.Label}
            class="thumb"
          />
        {/if}

        <div class="info">
          <h2>{$selectedItem.Label}</h2>
          {#if $selectedItem.UrlLink}
            <a
              href="{BASE_URL}/{$selectedItem.UrlLink}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Taste Atlas ↗
            </a>
          {/if}
        </div>
      </dir>
    </div>
  {/if}
  <div class="list-view">
    {$visibleItems.length} results
    {#each $visibleItems.filter((x, i) => i < 200) as item, i}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:pointerenter={(e) => e.pointerType === "mouse" && hover(item)}
        on:click={(e) =>
          e.pointerType === "mouse" ? select(item) : hover(item)}
        on:dblclick={(e) => e.pointerType !== "mouse" && select(item)}
      >
        {#if i < 10}
          <div>
            {#if item.Image}
              <img
                src="{BASE_URL}{item.Image}?w=30&h=30"
                alt={item.Label}
                class="mini-thumb"
                width="30"
                height="30"
              />
            {/if}
          </div>
        {/if}

        <div>
          {item.Label} <small>{Math.floor($itemDistances[i] / 1000)}km</small>
        </div>
      </div>
    {/each}
  </div>
</aside>

<style>
  .drawer {
    position: absolute;

    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    background: #fff;
    border-left: 1px solid #ddd;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 500;
  }

  .item-view {
    position: relative;

    width: 200px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .list-view {
    width: 120px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .list-view > div {
    padding: 4px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }

  .list-view > div:hover {
    background: #f9f9f9;
  }

  .close {
    align-self: flex-end;
    background: none;
    border: none;
    cursor: pointer;
    color: #555;
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;
  }

  .thumb {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
  }

  .mini-thumb {
    object-fit: cover;
  }

  .info {
    padding: 12px;
  }

  h2 {
    margin: 0 0 8px;
    font-size: 1.1em;
  }

  .info-collection {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 640px) {
    .drawer {
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      flex-direction: column;
      border-left: none;
      border-top: 1px solid #ddd;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    }

    .list-view {
      width: 100%;
      height: 90px;
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
      flex-shrink: 0;
    }

    .list-view > div {
      min-width: 90px;
      border-bottom: none;
      border-right: 1px solid #eee;
    }

    .item-view {
      width: 100%;
      max-height: 160px;
      border-left: none;
      border-bottom: 1px solid #ddd;
      flex-shrink: 0;
    }

    .info-collection {
      display: flex;
      flex-direction: row;
    }

    .thumb {
      max-width: 120px;
    }
  }
</style>
