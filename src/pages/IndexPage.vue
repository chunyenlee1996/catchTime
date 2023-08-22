<template>
  <IndexPhoto />
  <div class="filter" />
  <IndexIcon />

</template>

<script setup>
import IndexPhoto from 'src/components/IndexPhoto.vue'
import IndexIcon from 'src/components/IndexIcon.vue'
</script>

<style>
.filter {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #41404065;
  z-index: 1;
}
</style>
