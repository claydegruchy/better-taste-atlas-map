import { writable, derived } from "svelte/store";

export const allItems = writable([]);
export const searchQuery = writable("");
export const selectedItem = writable(null);
export const hoveredItem = writable(null);
export const visibleItems = writable([]);
export const itemDistances = writable([]);


export const filteredItems = derived(
	[allItems, searchQuery],
	([$allItems, $searchQuery]) => {
		if (!$searchQuery.trim()) return $allItems;
		const q = $searchQuery.toLowerCase();
		return $allItems.filter((item) => item.Label.toLowerCase().includes(q));
	}
);



selectedItem.subscribe(() => {
	hoveredItem.set(null)
})
