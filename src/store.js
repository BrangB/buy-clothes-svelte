import { writable } from 'svelte/store';

export const items = writable([]);

export const metaData = writable({
    totalItem: 0,
    selectedItem: []
})

export const setItems = (data) => {
    items.set(data)
}
