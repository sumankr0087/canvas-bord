<template>
  <div>
  <Palette />
  <Canvas />

  </div>
</template>
<script>
import Palette from './components/Palette.vue';
import Canvas from './components/Canvas.vue';
export default {
  components: { Palette, Canvas },
};

</script>
