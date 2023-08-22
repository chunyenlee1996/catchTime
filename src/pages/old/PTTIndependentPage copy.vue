<template>
  <!-- display content -->
  <div class="absolute-top contentContainer">
    <div class="q-mt-xl">
      <q-btn class="q-mt-md q-ml-md" color="teal-2" icon="fa-solid fa-angles-left" label="back" to="/PTTPage" />
    </div>
    <div class="PTTContainerLeft">
      <div class="q-pa-xl row justify-center">
        <q-form @submit="onSearchTheme" class="q-gutter-md col-9">
          <q-input name="theme" v-model="theme" color="teal-2" placeholder="輸入關鍵字">
            <q-btn flat :ripple="false" text-color="blue-grey-5" round icon="search" size="lg" @click="onSearchTheme" />
          </q-input>
        </q-form>
      </div>
      <!-- listHeaderGroup 標題列表(left) -->
      <div class="listHeaderGroup ">
        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 100%; max-width: 300px;">
          <q-item v-for="(box, i) in ActivityData" :key="i" clickable @click="ActivityDataClick(i)">
            <q-item-section>
              <q-item-label>{{ ActivityData[i].head }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ ActivityData[i].userName }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </div>
      <!-- 問題顯示區域 -->
      <div class="questionDisplay">
        <!-- 上半部 -->
        <div class="questionDisplayTop">
          <q-scroll-area class="q-mt-lg" :thumb-style="thumbStyle" :bar-style="barStyle"
            style="height:223px; max-width: 500px;">
            <div class="text-h4 text-center ">{{ activityDataForOne.head }}</div>
            <div class=" text-subtitle1 q-pa-md">
              <p>{{ activityDataForOne.content }}</p>
            </div>
            <div class="text-right q-mr-lg">
              <q-avatar rounded size="md" v-if="activityDataForOne.head !== '點選旁邊的欄位'">
                <img :src="activityDataForOne.userAvatar">
              </q-avatar>
              <div class="q-ml-xs text-h6" style="display: inline-block; position: relative; top: 6px; left: 6px;">{{
                activityDataForOne.userName }}
              </div>
            </div>
          </q-scroll-area>
        </div>
        <!-- 下半部 -->
        <q-scroll-area class="q-mt-lg" :thumb-style="thumbStyle" :bar-style="barStyle"
          style="height:182px; max-width: 500px;">
          <q-item v-for="(box, i) in activityDataForOne.messageBoard" :key="i">
            <q-item-section top avatar>
              <q-avatar rounded>
                <img :src="box.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ box.message }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ box.userName }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- 回應按鈕 -->
          <q-item v-if="activityDataForOne.head !== '點選旁邊的欄位'">
            <q-item-section top class="text-center">
              <q-btn color="teal-4" icon="fa-regular fa-comment" label="留言" @click="editorDialog = true" />
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </div>
    </div>
    <!-- editor 編輯器 -->
    <q-dialog v-model="editorDialog" persistent>
      <div class="editorDialogContainer">
        <div class="q-pa-md q-gutter-sm">
          <q-editor v-model="UserResponseForActivity" :definitions="{
            bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
          }" />
          <div class="text-center q-mt-xs">
            <q-btn color="pink-4" icon="fa-solid fa-xmark" @click="editorRemove" class="q-mr-md" />
            <q-btn color="teal-4" icon="fa-solid fa-check" @click="editorSend" />
          </div>
        </div>
      </div>
    </q-dialog>
    <!-- swiper容器 -->
    <div class="swiperContainer">
      <swiper :slidesPerView="4" :spaceBetween="20" :direction="'vertical'" loop="true" :modules="modules"
        class="mySwiper">
        <swiper-slide v-for="(box, i) in test" :key="i">
          <div class="row">
            <div class="activityBoxLeft" v-if="i % 2 === 0"></div>
            <div class="activityBox" v-if="i % 2 === 1"></div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, reactive } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
// import required modules
import { Pagination } from 'swiper/modules'

const route = useRoute()
const $q = useQuasar()

// 各主題進入資料存放區
const ActivityData = ref([])
// 主題中的各小問題存放區
const activityDataForOne = ref({
  head: '點選旁邊的欄位',
  userAvatar: 'https://source.boringavatars.com/beam/250/65sdfsdf65asg64w4t?colors=264653,2a9d8f,e9c46a,f4a261,e76f51',
  messageBoard: []
})
// 主題中的各小問題 ID 存放區
const activityDataForOneID = ref()
// 使用者回復資料存放區
const UserResponseForActivity = ref('')
// 編輯器開關
const editorDialog = ref(false)
// 使用者留言存放區
// const userMessageArray = ref()

// PTTContainerLeft 左邊佈局
// 關閉 dialog 框
const editorRemove = () => {
  UserResponseForActivity.value = ''
  editorDialog.value = false
}
// 傳送編輯器內容
const editorSend = async () => {
  try {
    await apiAuth.post(`PTTs/${activityDataForOneID.value}`, {
      message: UserResponseForActivity.value
    })
    UserResponseForActivity.value = ''
    editorDialog.value = false
    getData()
    $q.notify({
      message: 'success',
      caption: '新增留言成功',
      color: 'secondary'
    })
  } catch (error) {
    UserResponseForActivity.value = ''
    editorDialog.value = false
    $q.notify({
      message: 'error',
      caption: '請登入帳號',
      color: 'red'
    })
  }
}

const ActivityDataClick = (i) => {
  activityDataForOne.value = ActivityData.value[i]
  activityDataForOneID.value = ActivityData.value[i]._id
}

const test = reactive([
  { text: 'aaa' },
  { text: 'aaa' },
  { text: 'aaa' },
  { text: 'aaa' },
  { text: 'aaa' },
  { text: 'aaa' },
  { text: 'aaa' },
  { text: 'aaa' },
  { text: 'aaa' },
  { text: 'aaa' }
])
// swiper 部分
const modules = reactive([Pagination])

// 取各別主題的資料
const getData = async () => {
  try {
    const { data } = await api.get('/PTTs/all', {
      params: {
        theme: route.params.theme
      }
    })
    ActivityData.value = data.result
  } catch (error) {
    console.log(error)
    $q.notify({
      message: 'error',
      caption: '讀取失敗',
      color: 'red'
    })
  }
};
// 立即執行 function 取資料
(() => {
  getData()
})()
</script>

<style scoped>
.imgBox {
  width: 12vw;
  height: 12vw;
}

.imgBoxText {
  width: 12vw;
  height: 12vw;
}

.contentContainer {
  width: 100%;
  height: 100vh;
}

/* swiper 專區 */
.swiperContainer {
  width: 25%;
  height: 80%;
  /* border: 1px solid #333; */
  position: absolute;
  right: 220px;
  top: 12vh;
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
  width: 170px;
  height: 170px;
  border: 1px dashed #333;
  /* border-radius: 15%; */
  margin-right: 210px;
}

.activityBox {
  width: 170px;
  height: 170px;
  border: 1px dashed #333;
  /* border-radius: 15%; */
  margin-left: 210px;
}

/* swiper區域結束 */
/* PTTContainerLeft 左邊區域 */
.PTTContainerLeft {
  position: absolute;
  top: 150px;
  left: 70px;
  width: 50vw;
  height: 75vh;
  border: 1px dashed #333;
  /* border-radius: 50px; */
}

/* listHeaderGroup 標題列表群 */
.listHeaderGroup {
  position: absolute;
  width: 300px;
  height: 50vh;
  left: 50px;
  border-right: 1px solid#333;
  /* overflow-y: auto; */
}

/* 問題顯示區 */
.questionDisplay {
  position: absolute;
  width: 480px;
  height: 50vh;
  left: 400px;
  /* border: 1px solid#33333319; */
}

.questionDisplayTop {
  height: 236px;
  border-bottom: 1px solid #333;
}

.editorDialogContainer {
  width: 600px;
  background-color: #fff;
}
</style>
