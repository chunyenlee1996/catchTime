<template>
  <div>
    <swiper :spaceBetween="30"  :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }" :modules="modules" @autoplayTimeLeft="onAutoplayTimeLeft">
      <swiper-slide v-for="(result, idx) in swiperPhotoData" :key="idx" class="swiperCss">
        <img :src="result.imgURL" style="height:calc(100vh - 50px) ;">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { api } from 'src/boot/axios'
import { onMounted, reactive } from 'vue'
// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// swiper 部分
const modules = reactive([Autoplay, Pagination, Navigation])
const swiperPhotoData = reactive([])
const getPhoto = async () => {
  try {
    const { data } = await api.get('/images/all')
    swiperPhotoData.push(...data.result)
    console.log(swiperPhotoData)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getPhoto()
})
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--swiper-theme-color);
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: var(--swiper-theme-color);
  fill: none;
  stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}

</style>
