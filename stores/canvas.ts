// stores/canvas.ts
import { defineStore } from 'pinia';

interface CanvasElement {
  color: string;
  x: number;
  y: number;
}

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    elements: [] as CanvasElement[],
  }),
  actions: {
    addElement(element: CanvasElement) {
      this.elements.push(element);
    },
  },
});
