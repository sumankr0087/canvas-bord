import { defineStore } from 'pinia';

export const useCanvasStore = defineStore('canvas', {
    state: () => ({
        elements: [],
    }),
    actions: {
        addElement(element) {
            this.elements.push(element);
        },
        updateElementPosition(index, newPosition) {
            console.log("jsds", index, newPosition);
            this.elements[index].position = newPosition;
        },
        updateElementWidth(index, width) {
            this.elements[index].width = width;
        },
        updateElementHeight(index, height) {
            console.log(height);
            this.elements[index].height = height;
        },
    },
});
