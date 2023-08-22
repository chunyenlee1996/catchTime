<template>
  <div class="imgBox">
    <div class="imgBoxText">
      <q-btn round color="white" text-color="black" icon="add" @click="fixed = true" />
    </div>
  </div>
  <!-- create -->
  <div>
    <q-dialog v-model="fixed">
      <q-card>
        <q-form @submit="onSubmit">

          <q-card-section>
            <div class="text-h6">新增作品</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh ; width: 25vw;" class="scroll">
            <!-- VueFileAgent 上傳圖片的套件 -->
            <!-- :max-files="1" 有綁是數字，沒綁是文字 -->
            <!-- :multiple="false" 這個事是否同意多檔上傳 -->
            <VueFileAgent v-model="imgData.files" v-model:raw-model-value="imgData.rawFiles" :max-files="1" max-size="1MB"
              accept="image/jpg,image/jpeg,image/png" :multiple="false" :error-text="{ type: '檔案格式錯誤', size: '檔案太大' }"
              help-text="請選擇檔案或拖放到這裡" class="q-mb-md"></VueFileAgent>
            <q-input filled type="text" v-model="imgData.name" label="名稱 *" lazy-rules
              :rules="[val => !!val || '缺少名稱',]" />
            <q-input filled type="textarea" v-model="imgData.content" label="介紹 *" lazy-rules
              :rules="[val => !!val || '缺少內容',]" />
            <q-select filled v-model="imgData.formTheme" :options="themeOptions" label="類別 *" />
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
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user'
import { apiAuth } from 'src/boot/axios'
const $q = useQuasar()
const user = useUserStore()
const fixed = ref(false)
// 設定表單資料儲存名稱
const imgData = reactive({
  userId: user.userId,
  name: '',
  content: '',
  formTheme: '',
  files: [],
  rawFiles: []
})
const themeOptions = ['風景攝影', '人像攝影', '動態攝影', '建築攝影', '靜物攝影', '紀實攝影', '實驗性攝影', '其他']
const emit = defineEmits(['ImgItems'])
// 送出圖片
const onSubmit = async (value) => {
  if (imgData.files.length === 0) return
  try {
    const fd = new FormData()
    // fd.append('userId', value.imgData.userId)
    fd.append('name', imgData.name)
    fd.append('content', imgData.content)
    fd.append('formTheme', imgData.formTheme)
    fd.append('imgURL', imgData.files[0].file)
    fd.append('rawFiles', imgData.rawFiles[0])
    await apiAuth.post('/images', fd)
    $q.notify({
      message: 'success',
      caption: '新增成功',
      color: 'secondary'
    })
    emit('ImgItems')
    fixed.value = false
    resetForm()
  } catch (error) {
    console.log(error)
    $q.notify({
      message: 'error',
      caption: '新增失敗',
      color: 'red'
    })
  }
}
// 清空圖片表單
const resetForm = () => {
  imgData.userId = ''
  imgData.name = ''
  imgData.content = ''
  imgData.formTheme = ''
  imgData.files = ''
  imgData.rawFiles = ''
}

</script>

<style></style>
