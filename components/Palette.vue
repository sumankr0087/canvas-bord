<template>
    <div class="flex justify-around">
        <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }"
            class="cursor-move h-20 w-20 mx-[4rem] my-[2rem]" draggable="true"
            @dragstart="dragStart($event, color)">
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            colors: ['#06b5eb', 'red', '#24C724'],
        };
    },
    methods: {
        dragStart(event, color) {
            event.dataTransfer.setData('color', color);
        },
    },
};
</script>
  