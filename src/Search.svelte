<script>
  import { searchQuery, filteredItems } from "./stores.js";
</script>

<div class="search">
  <input
    type="search"
    placeholder="Search dishes, foods…"
    bind:value={$searchQuery}
  />
  <span class="count">{$filteredItems.length}</span>
</div>

<style>
  .search {
    display: flex;
    align-items: center;	
    gap: 6px;
    flex: 1;
  }

  input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 0.9em;
    font-family: inherit;
    outline: none;
  }

  input:focus {
    border-color: #e63946;
  }

  .count {
    font-size: 0.8em;
    color: #888;
    white-space: nowrap;
  }
  
</style>
