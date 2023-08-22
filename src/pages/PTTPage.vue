<template>
  <div class="topic-bg"></div>
  <!-- title -->
  <div class="q-mb-md q-mt-xl text-center text-h2 text-weight-medium text-uppercase">Topics</div>
  <div class="text-center text-h4">Group your hobby</div>
  <!-- 論壇項目 -->
  <div class="row wrap q-pa-xl">
    <div class="col-3 justify-center flex q-mb-lg q-mt-lg" v-for="(theme, index) in PttTheme" :key="index">
      <div class="imgBox">
        <q-img :src="PttTheme[index].imgUrl" :ratio="1" spinner-color="primary" />
        <div class="imgBoxText" style="opacity: 1;">
          <q-btn flat :to="'/PTTIndependentPage/' + PttTheme[index].name">
            {{ PttTheme[index].name }}
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <!-- create ptt -->
  <div class=" absolute-center q-mt-xl pttCreateLand flex justify-center items-center">
    <q-btn round flat padding="xl" color="blue-grey-5" icon="fa-solid fa-plus" @click="openAllThemeCreatePTTDialog" />
  </div>
  <!-- create dialog -->
  <div>
    <q-dialog v-model="createPTTDialog">
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
</template>

<script setup>

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { reactive, ref } from 'vue'
import { apiAuth } from 'src/boot/axios'
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
// createPTTDialog 開關預設
const createPTTDialog = ref(false)
// display content 的開關

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

// openAllThemeCreatePTTDialog
const openAllThemeCreatePTTDialog = () => {
  createPTTDialog.value = true
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
    createPTTDialog.value = false
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

</style>
