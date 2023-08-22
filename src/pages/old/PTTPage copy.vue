<template>
  <!-- title -->
  <div class="q-mb-md q-mt-xl text-center text-h2 text-weight-medium text-uppercase">Topics</div>
  <div class="text-center text-h4">Group your hobby</div>
  <!-- 論壇項目 -->
  <div class="row wrap q-pa-xl">
    <div class="col-3 justify-center flex q-mb-lg q-mt-lg" v-for="(theme, index) in PttTheme" :key="index">
      <div class="imgBox">
        <q-img :src="PttTheme[index].imgUrl" :ratio="1" spinner-color="primary" />
        <div class="imgBoxText">
          <q-btn @click="DpContainerOpen(index)">
            {{ PttTheme[index].name }}
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <!-- create ptt -->
  <div class=" absolute-center q-mt-xl pttCreateLand flex justify-center items-center">
    <q-btn round flat padding="xl" color="blue-grey-5" icon="fa-solid fa-plus" @click="openAllThemeCreateDialog" />
  </div>
  <!-- create dialog -->
  <div>
    <q-dialog v-model="createDialog">
      <q-card>
        <q-form @submit="allThemeSubmit">

          <q-card-section>
            <div class="text-h6">新增話題</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh ; width: 25vw;" class="scroll">
            <!-- VueFileAgent 上傳圖片的套件 -->
            <!-- :max-files="1" 有綁是數字，沒綁是文字 -->
            <!-- :multiple="false" 這個事是否同意多檔上傳 -->
            <VueFileAgent v-model="allThemePTTData.files" v-model:raw-model-value="allThemePTTData.rawFiles"
              :max-files="1" max-size="1MB" accept="image/jpg,image/jpeg,image/png" :multiple="false"
              :error-text="{ type: '檔案格式錯誤', size: '檔案太大' }" help-text="需要上傳圖片請選擇檔案或拖放到這裡" class="q-mb-md"></VueFileAgent>
            <q-input filled type="text" v-model="allThemePTTData.head" label="標題 *" lazy-rules
              :rules="[val => !!val || '缺少標題',]" />
            <q-input filled type="textarea" v-model="allThemePTTData.content" label="介紹 *" lazy-rules
              :rules="[val => !!val || '缺少內容',]" />
            <q-select filled v-model="allThemePTTData.theme" :options="themeOptions" label="類別 *" />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn label="送出" type="submit" color="primary" loading="true" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
  <!-- display content -->
  <div class="absolute-top contentContainer" v-if="DpContainer">
    <div class="q-mt-xl">
      <q-btn class="q-mt-md q-ml-md" color="teal-2" icon="fa-solid fa-angles-left" label="back"
        @click="DpContainerClose" />
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
            <q-item-section top avatar>
              <q-avatar rounded>
                <img :src="ActivityData[i].userAvatar">
              </q-avatar>
            </q-item-section>

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
            <div class="text-h2 text-center ">{{ activityDataForOne ? activityDataForOne.head : '點選旁邊的欄位' }}</div>
            <div class=" text-subtitle1 q-pa-md">
              <p>{{ activityDataForOne ? activityDataForOne.content : '' }}</p>
            </div>
            <div class="text-right q-mr-lg">
              <q-avatar rounded size="md">
                <img :src="activityDataForOne ?activityDataForOne.userAvatar:'https://source.boringavatars.com/beam/250/65sdfsdf65asg64w4t?colors=264653,2a9d8f,e9c46a,f4a261,e76f51'">
              </q-avatar>
              <div class="q-ml-xs text-h6" style="display: inline-block; position: relative; top: 6px; left: 6px;">{{
                activityDataForOne ? activityDataForOne.userName : 'Artist' }}
              </div>
            </div>
          </q-scroll-area>
        </div>
        <!-- 下半部 -->
        <q-scroll-area class="q-mt-lg" :thumb-style="thumbStyle" :bar-style="barStyle"
          style="height:182px; max-width: 500px;">
          <q-item v-for="(box, i) in test" :key="i">
            <q-item-section top avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>meta</q-item-label>
            </q-item-section>
          </q-item>
          <!-- 回應按鈕 -->
          <q-item>
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
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Pagination } from 'swiper/modules'
import { reactive, ref } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { useQuasar } from 'quasar'
// 引用內部元件區
const $q = useQuasar()
// 群組份類表
const PttTheme = ([
  {
    name: '風景攝影',
    imgUrl: 'https://picsum.photos/1080/1080/?random=10'
  },
  {
    name: '人像攝影',
    imgUrl: 'https://picsum.photos/1080/1080/?random=9'
  },
  {
    name: '動態攝影',
    imgUrl: 'https://picsum.photos/1080/1080/?random=8'
  },
  {
    name: '建築攝影',
    imgUrl: 'https://picsum.photos/1080/1080/?random=7'
  },
  {
    name: '靜物攝影',
    imgUrl: 'https://picsum.photos/1080/1080/?random=6'
  },
  {
    name: '紀實攝影',
    imgUrl: 'https://picsum.photos/1080/1080/?random=5'
  },
  {
    name: '實驗性攝影',
    imgUrl: 'https://picsum.photos/1080/1080/?random=4'
  },
  {
    name: '其他',
    imgUrl: 'https://picsum.photos/1080/1080/?random=3'
  }
])
// createDialog 開關預設
const createDialog = ref(false)
// display content 的開關
const DpContainer = ref(false)
// 各主題進入資料存放區
const ActivityData = ref([])
// 主題中的各小問題存放區
const activityDataForOne = ref()
// 使用者回復資料存放區
const UserResponseForActivity = ref('')
// 編輯器開關
const editorDialog = ref(false)
// allThemePTT 資料存放區
const allThemePTTData = reactive({
  head: '',
  content: '',
  theme: '',
  files: [],
  rawFiles: []
})
// 表單類別資料庫
const themeOptions = ['風景攝影', '人像攝影', '動態攝影', '建築攝影', '靜物攝影', '紀實攝影', '實驗性攝影', '其他']
// 各個主題按鈕點選時
const DpContainerOpen = async (index) => {
  DpContainer.value = true
  // 取各別主題的資料
  try {
    const { data } = await api.get('/PTTs/all', {
      params: {
        theme: PttTheme[index].name
      }
    })
    ActivityData.value = data.result
    console.log(data.result)
    console.log(ActivityData.value[1].userAvatar)
  } catch (error) {
    console.log(error)
  }
}
const DpContainerClose = () => {
  DpContainer.value = false
  activityDataForOne.value = ''
}
// openAllThemeCreateDialog
const openAllThemeCreateDialog = () => {
  createDialog.value = true
}
// 清空表單
const resetForm = () => {
  allThemePTTData.head = ''
  allThemePTTData.content = ''
  allThemePTTData.theme = ''
  allThemePTTData.files = ''
  allThemePTTData.rawFiles = ''
}
// 全類型的表單送出
const allThemeSubmit = async (value) => {
  try {
    const fd = new FormData()
    // fd.append('userId', value.imgData.userId)
    fd.append('head', allThemePTTData.head)
    fd.append('content', allThemePTTData.content)
    fd.append('theme', allThemePTTData.theme)
    if (allThemePTTData.files[0] !== undefined) fd.append('imgURL', allThemePTTData.files[0].file)
    await apiAuth.post('/PTTs', fd)
    $q.notify({
      message: 'success',
      caption: '新增成功',
      color: 'secondary'
    })
    createDialog.value = false
    resetForm()
    console.log(allThemePTTData.files)
  } catch (error) {
    $q.notify({
      message: 'error',
      caption: '新增失敗',
      color: 'red'
    })
  }
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
// PTTContainerLeft 左邊佈局
// 關閉 dialog 框
const editorRemove = () => {
  editorDialog.value = false
}
// 傳送編輯器內容
// const editorSend = async () => {
//   const { data } = await apiAuth.post(`/${}`)
// }

const ActivityDataClick = (i) => {
  activityDataForOne.value = ActivityData.value[i]
  console.log(activityDataForOne.value)
}

// swiper 部分
const modules = reactive([Pagination])
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
  background-color: #ffffff;
}

.pttCreateLand {
  width: 15vh;
  height: 15vh;
  border-radius: 50%;
  /* border:1px solid #bebdbd; */
}

/* swiper 專區 */
.swiperContainer {
  width: 25%;
  height: 80%;
  /* border: 1px solid #333; */
  position: absolute;
  right: 220px;
  top: 12vh;
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
