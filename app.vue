<template>
  <div>
  <Palette />
  <Canvas />

  </div>
</template>
<script>
import MyCounter from './components/MyCounter.vue'
import Palette from './components/Palette.vue';
import Canvas from './components/Canvas.vue';
export default {
  components: { MyCounter, Palette, Canvas },
};

</script>
