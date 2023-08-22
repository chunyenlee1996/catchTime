<template>
    <!-- title -->
    <div class="q-mb-md q-mt-xl text-center text-h2 text-weight-medium text-uppercase">Discovery</div>
  <div class="text-center text-h4">Explore interesting, captivating ideas</div>
  <!-- search bar -->
  <SearchBar @SearchTheme="imgItems" />
  <!-- photo group -->
  <div class="row justify-center">
    <div class="row wrap " style="width: 80vw;">
      <!-- 新增圖片 -->
      <CreateImg @ImgItems="imgItems"></CreateImg>
      <!-- 迴圈圖片 -->
      <DiscoverPhotoBox :imgLists="imgLists" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import CreateImg from 'src/components/CreateImg.vue'
import DiscoverPhotoBox from 'src/components/DiscoverPhotoBox.vue'
import SearchBar from 'src/components/SearchBar.vue'

// 圖片列出區域
const imgLists = reactive([])

// 取跑圖片迴圈資料
const imgItems = async (value) => {
  try {
    const { data } = await api.get('/images/all', {
      params: {
        search: value
      }
    })
    imgLists.splice(0, imgLists.length, ...data.result)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  imgItems('')
})

</script>
