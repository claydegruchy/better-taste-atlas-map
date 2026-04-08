<script>
  import { onMount } from "svelte";
  import { allItems } from "./stores.js";
  import Map from "./Map.svelte";
  import Search from "./Search.svelte";
  import Sidebar from "./Sidebar.svelte";
  import About from "./About.svelte";

  import data from "../public/data.json";

  onMount(async () => {
    allItems.set(data);
  });
</script>

<div class="shell">
  <header class="topbar">
    <Search />
    <About />
  </header>

  <div class="map-area">
    <Map />
    <Sidebar />
  </div>
</div>

<style>
  .shell {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    height: 44px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 1000;
    flex-shrink: 0;
  }

  .drawer {
    
  }

  .map-area {
    flex: 1 1 auto;
    position: relative;
    min-height: 0;
  }

  :global(.ol-zoom) {
    top: auto;
    bottom: 10px;
    left: 10px;
  }
</style>
