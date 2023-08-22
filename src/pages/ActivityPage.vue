<template>
  <!-- swiper容器 -->
  <div v-if="display = true" class="swiperContainer">
    <swiper :slidesPerView="4" :spaceBetween="30" :direction="'vertical'" loop="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(box, i) in saveActivityData" :key="i">
        <div class="row">
          <q-btn class="activityBoxLeft" v-if="i % 2 === 0" @click="openActivityDialog(i)">
            <div class="activityTitlePosition text-h5 text-left">{{ box.head }}</div>
            <div class="activityTimePosition text-weight-regular ">{{ new Date(box.date).toLocaleDateString() }}</div>
          </q-btn>
          <q-btn class="activityBox" v-if="i % 2 === 1" @click="openActivityDialog(i)">
            <div class="activityTitlePosition text-h5 text-left">{{ box.head }}</div>
            <div class="activityTimePosition text-weight-regular ">{{ new Date(box.date).toLocaleDateString() }}</div>
          </q-btn>
        </div>
      </swiper-slide>
    </swiper>
  </div>
  <!-- activityDialog -->
  <div>
    <q-dialog v-model="activityDialog" full-width>
      <q-card class="column" style="width: 30vw !important; height: 80%;">
        <q-scroll-area style="width: 100%; height: 100%;">
          <q-card-section>
            <img :src="saveActivityData[activityIndex].imgURL"
              style="display: block; max-height: 70vh; margin: auto; max-width: 100%;" />
          </q-card-section>
          <q-card-section>
            <div class="text-h6">{{ saveActivityData[activityIndex].head }}</div>
          </q-card-section>

          <q-card-section class="col q-pt-none">
            {{ saveActivityData[activityIndex].content }}
          </q-card-section>
          <q-card-section class="col q-pt-none text-right">
            活動時間 : {{ new Date(saveActivityData[activityIndex].date).toLocaleString() }}
          </q-card-section>
          <q-card-section class="text-right">
            <q-btn v-if="saveActivityData[activityIndex].join.includes(user.userId.toString())" label="取消參與"
              @click="removeJoinActivity" v-close-popup />
            <q-btn v-if="!saveActivityData[activityIndex].join.includes(user.userId.toString())" label="參加活動"
              @click="joinActivity" v-close-popup />
          </q-card-section>
        </q-scroll-area>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Pagination } from 'swiper/modules'
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { api, apiAuth } from 'src/boot/axios'

const $q = useQuasar()
// 活動Dialog開關
const activityDialog = ref(false)

const saveActivityData = ref([{ head: '', date: '' }])
const activityIndex = ref(0)

// 取得活動資料
const getActivityData = async () => {
  try {
    const { data } = await api.get('/activity/all', {
      params: {
        theme: ''
      }
    })
    console.log(data)
    saveActivityData.value = data.result
  } catch (error) {

  }
}
getActivityData()
const openActivityDialog = (index) => {
  activityIndex.value = index
  activityDialog.value = true
}
const joinActivity = async () => {
  try {
    await apiAuth.post(`/activity/${saveActivityData.value[activityIndex.value]._id}`)
    getActivityData()
    $q.notify({
      message: 'success',
      caption: '參與活動成功',
      color: 'secondary'
    })
  } catch (error) {
    console.log(saveActivityData.value[activityIndex.value]._id)
    $q.notify({
      message: 'error',
      caption: '參與活動失敗',
      color: 'red'
    })
  }
}

const removeJoinActivity = async () => {
  try {
    await apiAuth.patch(`/activity/${saveActivityData.value[activityIndex.value]._id}`)
    getActivityData()
    $q.notify({
      message: 'success',
      caption: '取消活動成功',
      color: 'secondary'
    })
  } catch (error) {
    $q.notify({
      message: 'error',
      caption: '取消活動失敗',
      color: 'red'
    })
  }
}

// swiper 部分
const modules = reactive([Pagination])
</script>
<style scoped>
/* swiper 專區 */
.swiperContainer {
  width: 170px;
  height: 80%;
  /* border: 1px solid #333; */
  float: right;
  margin-right: 10%;
  overflow-y: hidden;
}

.swiper {
  width: 100%;
  height: 100%;
  /* border: 1px solid #333; */
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #333; */
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activityBoxLeft {
  position: relative;
  width: 170px;
  height: 170px;
  border: 1px dashed #333;
  /* border-radius: 15%; */
  /* margin-right: 210px; */
  background-color: rgb(215, 227, 233);
  box-sizing: border-box;
}

.activityBox {
  position: relative;
  width: 170px;
  height: 170px;
  border: 1px dashed #333;
  /* border-radius: 15%; */
  /* margin-left: 210px; */
  background-color: rgb(243, 243, 243);
  box-sizing: border-box;
}

.activityTimePosition {
  position: absolute;
  right: 10px;
  bottom: 0;
  text-shadow: 3px 3px 5px #b4b4b4;
}

.activityTitlePosition {
  position: absolute;
  left: 10px;
  top: 5px;
  /* text-shadow: 3px 3px 2px #b4b4b4; */
}

/* swiper區域結束 */
</style>
