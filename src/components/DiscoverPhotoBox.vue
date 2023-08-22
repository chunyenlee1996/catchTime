<template>
  <!-- q-intersection 加 once 可以讓他只跑一次 -->
  <q-intersection class="qInterSection" v-for="(result, index) in props.imgLists" :key="result._id" transition="scale">
    <div class="imgBox">
      <q-img :src="result.imgURL" :ratio="1" spinner-color="primary" />
      <div class="imgBoxText">
        <q-btn @click="imgFixed(index)">
          {{ result.name }}
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="imgFixedTrue[index]" full-width>
      <!-- <q-card style="width: 60vw; max-height: 70vh;" dark> -->
      <q-card style="width: 54vw !important; height: 90%;" dark>
        <!-- 隱藏 scroll -->
        <q-scroll-area style="width: 100%; height: 100%;">
          <div class="q-pa-md">
            <q-img :src="result.imgURL" height="70vh" ratio :img-style="{ width: 'auto' }" class="text-center"></q-img>
            <q-card-section>
              <div class="text-h6 q-mb-xs">{{ result.name }}</div>
              <div class="text-subtitle2">{{ result.content }}</div>
              <div class="text-subtitle2 text-right">Artist - {{ result.userName }}</div>
            </q-card-section>
          </div>
        </q-scroll-area>
      </q-card>
    </q-dialog>
  </q-intersection>
</template>

<script setup>
import { ref } from 'vue'
const imgFixedTrue = ref([])
const props = defineProps({
  imgLists: {
    type: Array,
    default: () => []
  }
})

// 迴圈點擊打開dialog的function
const imgFixed = (index) => {
  // console.log(imgFixedTrue)
  imgFixedTrue.value[index] = true
}
</script>

<style scoped>
.qInterSection {
  width: 16vw;
  height: 16vw;
}
</style>
