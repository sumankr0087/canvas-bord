<template>
    <div class="mx-[4rem] relative h-[600px] bg-[#f0f0f0]" @dragover.prevent @drop="drop" ref="canvas">
        <div v-for="(element, index) in canvasStore.elements" :key="index"
            :style="{ left: element.position.x + 'px', top: element.position.y + 'px', backgroundColor: element.color, width: element.width + 'px', height: element.height + 'px' }"
            class="h-[110px] absolute cursor-move" @mousedown="startDrag(index, $event)">
            <div @mousedown.stop="startResize(index, $event)"
                class="absolute top-0 right-0 h-full w-4 bg-[#00000033] cursor-ew-resize"></div>
                <div @mousedown.stop="startResizeHeight(index, $event)"
                class="absolute bottom-0 h-4 w-full bg-[#00000033] cursor-pointer"></div>
        </div>
    </div>
</template>

<script>
import { useCanvasStore } from '@/stores/canvas';

export default {
    data() {
        return {
            draggingIndex: null,
            resizingIndex: null,
            offsetX: 0,
            offsetY: 0,
            initialWidth: 0,
            initialHeight:0,
        };
    },
    computed: {
        canvasStore() {
            return useCanvasStore();
        },
    },
    methods: {
        drop(event) {
            const color = event.dataTransfer.getData('color');
            const position = { x: event.offsetX, y: event.offsetY };
            this.canvasStore.addElement({ color, position, width: 200, height: 100 });
        },
        startDrag(index, event) {
            this.draggingIndex = index;
            const element = this.$refs.canvas.children[index];
            const rect = element.getBoundingClientRect();
            
            this.offsetX = event.clientX - rect.left;
            this.offsetY = event.clientY - rect.top;
            
            document.addEventListener('mousemove', this.drag);
            document.addEventListener('mouseup', this.stopDrag);
        },
        drag(event) {
            if (this.draggingIndex !== null) {
                const canvas = this.$refs.canvas;
                const canvasRect = canvas.getBoundingClientRect();
                
                const newX = event.clientX - canvasRect.left - this.offsetX;
                const newY = event.clientY - canvasRect.top - this.offsetY;

                const elementWidth = this.canvasStore.elements[this.draggingIndex].width;
                // const elementHeight = 100;
                const elementHeight = this.canvasStore.elements[this.draggingIndex].height;


                const snappedX = Math.round(newX / (canvas.clientWidth / 12)) * (canvas.clientWidth / 12);
                

                const clampedX = Math.min(
                    Math.max(snappedX, 0),
                    canvas.clientWidth - elementWidth
                );

                const clampedY = Math.min(
                    Math.max(newY, 0),
                    canvas.clientHeight - elementHeight
                );

                this.canvasStore.updateElementPosition(this.draggingIndex, { x: clampedX, y: clampedY });
            }
        },
        stopDrag() {
            document.removeEventListener('mousemove', this.drag);
            document.removeEventListener('mouseup', this.stopDrag);
            this.draggingIndex = null;
        },
        startResize(index, event) {
            this.resizingIndex = index;
            this.initialWidth = this.canvasStore.elements[index].width;
            this.offsetX = event.clientX;
            document.addEventListener('mousemove', this.resize);
            document.addEventListener('mouseup', this.stopResize);
        },
        startResizeHeight(index, event) {
            console.log("here");
            this.resizingIndex = index;
            this.initialHeight = this.canvasStore.elements[index].height
            console.log('this.initialHeight',this.initialHeight);
            this.offsetY = event.clientY;
            document.addEventListener('mousemove', this.resizeHeight);
            document.addEventListener('mouseup', this.stopResize);
        },
        resize(event) {
            if (this.resizingIndex !== null) {
                const deltaX = event.clientX - this.offsetX;
                console.log(deltaX);
                console.log(this.initialWidth,'dkljf');
                const newWidth = Math.max(100, this.initialWidth + deltaX);
                this.canvasStore.updateElementWidth(this.resizingIndex, newWidth);
            }
        },
        resizeHeight(event) {
            if(this.resizingIndex !== null) {
                console.log('elses');
                const deltaX = event.clientY - this.offsetY;
                console.log(deltaX);
                console.log('this.initialHeight',this.initialHeight);
                const newHeight = this.initialHeight + deltaX;
                console.log("newHeight",newHeight);
                this.canvasStore.updateElementHeight(this.resizingIndex, newHeight);
            }
        },
        stopResize() {
            document.removeEventListener('mousemove', this.resize);
            document.removeEventListener('mouseup', this.stopResize);
            this.resizingIndex = null;
        },
    },
};
</script>
