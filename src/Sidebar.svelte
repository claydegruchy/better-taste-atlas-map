<script>
  import { selectedItem } from "./stores.js";

  const BASE_URL = "https://www.tasteatlas.com";
</script>

<aside class="sidebar">
  {#if $selectedItem}
    <div class="item-view">
      <button
        class="close"
        on:click={() => selectedItem.set(null)}
        aria-label="Close">✕</button
      >

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
    </div>
  {/if}
  <div class="list-view">
    <div>item 1</div>
    <div>item 1</div>
    <div>item 1</div>
    <div>item 1</div>
    <div>item 1</div>
  </div>
</aside>

<style>
  .sidebar {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: #fff;
    border-left: 1px solid #ddd;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 500;
  }
  .list-view {
    display: flex;
    width: 120px;
    background: brown;
  }

  .item-view {
    width: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .close {
    align-self: flex-end;
    margin: 8px 8px 0 0;
    background: none;
    border: none;
    font-size: 1.1em;
    cursor: pointer;
    color: #555;
    padding: 4px 6px;
    border-radius: 4px;
  }

  .close:hover {
    background: #f0f0f0;
    border-color: transparent;
  }

  .thumb {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
  }

  .info {
    padding: 12px;
  }

  h2 {
    margin: 0 0 8px;
    font-size: 1.1em;
  }
</style>
