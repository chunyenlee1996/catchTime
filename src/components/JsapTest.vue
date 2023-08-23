<template>
  <div class="gsapContainer">
    <div class="box"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import { gsap } from 'gsap'

onMounted(
  () => {
    const tl = gsap.timeline()
    tl.to('.box', {
      y: 100,
      duration: 1,
      repeat: 2,
      ease: 'none',
      onComplete () {
        document.querySelector('.box').style.display = 'none'
      }
    }).to('.box', {
      x: 100,
      duration: 3
    })
  }
)
</script>

<style scoped>
.box{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #faf;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 10;
}
</style>
