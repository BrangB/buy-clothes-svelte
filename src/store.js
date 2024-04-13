import { writable } from 'svelte/store';

export const items = writable([]);

export const setItems = (data) => {
    items.set(data)
}