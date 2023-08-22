<template>
  <!-- head -->
  <div>
    <q-img src="https://picsum.photos/3000/3000/?random=1" :ratio="1" height="25vh">
      <div class="absolute-bottom-left text-left q-mb-md">
        <q-avatar size="md"><img :src="user.avatar"></q-avatar>
        <span class="q-ml-md" style="font-size: 20px;">{{ user.userName }} <div class="q-ml-xl" style="font-size: 5px;">{{
          user.userId }}</div></span>
      </div>
      <q-btn flat class="all-pointer-events absolute-bottom-right q-ma-xs" round color="white" icon="fa-solid fa-ellipsis"
        @click="reviseAboutMe" />
    </q-img>
  </div>
  <!-- body -->
  <div class="q-pa-xl text-center">
    <div style="width: 100%;">
      <!-- aboutMe -->
      <div id="aboutMe" class="q-pa-xl">
        <div id="aboutMeLeft" class="float-left">
          <div class="text-h4 text-left">About Me</div>
          <div class="aboutMEBox text-left q-mt-md" style=" white-space:pre">{{ aboutMeData.aboutMe }}</div>
        </div>
        <div id="aboutMeRight" class="float-right"><q-img :src="aboutMeData.mainImg" :ratio="1" class="rounded-borders" />
        </div>
      </div>
      <!-- photo -->
      <div class="q-pa-xl contentBox">
        <div>
          <div class="text-h4 text-left">你的照片 <span class="float-right"><q-btn round color="white" text-color="black"
                icon="add" @click="clickCreateImg" /></span></div>
        </div>

        <!-- create image -->
        <div>
          <q-dialog v-model="createImg">
            <q-card>
              <q-form @submit="onSubmit">

                <q-card-section>
                  <div class="text-h6">{{ revisePhotoId.length > 0 ? '編輯照片' : '新增照片' }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 50vh ; width: 25vw;" class="scroll">
                  <!-- VueFileAgent 上傳圖片的套件 -->
                  <!-- :max-files="1" 有綁是數字，沒綁是文字 -->
                  <!-- :multiple="false" 這個事是否同意多檔上傳 -->
                  <VueFileAgent v-if="revisePhotoId.length === 0" v-model="imgData.files"
                    v-model:raw-model-value="imgData.rawFiles" :max-files="1" max-size="1MB"
                    accept="image/jpg,image/jpeg,image/png" :multiple="false"
                    :error-text="{ type: '檔案格式錯誤', size: '檔案太大' }" help-text="請選擇檔案或拖放到這裡" class="q-mb-md"></VueFileAgent>
                  <q-input filled type="text" v-model="imgData.name" label="名稱 *" lazy-rules
                    :rules="[val => !!val || '缺少名稱',]" />
                  <q-input filled type="textarea" v-model="imgData.content" label="介紹 *" lazy-rules
                    :rules="[val => !!val || '缺少內容',]" />
                  <q-select filled v-model="imgData.formTheme" :options="themeOptions" label="類別 *" />
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn label="送出" type="submit" color="primary" :loading="loading" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>
        </div>
        <!-- 迴圈圖片 -->
        <div class="row q-mt-md">
          <div v-for="(result, index) in saveUserImage" :key="result._id">
            <div class="imgBox">
              <q-img :src="result.imgURL" :ratio="1" spinner-color="primary" />
              <div class="imgBoxText">
                <q-btn flat @click="imgFixed(index)">
                  {{ result.name }}
                </q-btn>
                <q-btn flat round size="sm" icon="delete" class=" absolute " style="top: 5px;right: 5px;"
                  @click="imgWantDelete(index)"></q-btn>
              </div>
            </div>
            <q-dialog v-model="imgFixedTrue[index]" maximized>
              <!-- <q-card style="width: 60vw; max-height: 70vh;" dark> -->

              <q-card style="width: 43vw; max-height: 70vh;" dark>
                <!-- 隱藏 scroll -->
                <q-scroll-area style="width: 100%; height: 100%;">
                  <div class="q-pa-md">
                    <q-img :src="result.imgURL" height="55vh" ratio :img-style="{ width: 'auto' }"
                      class="text-center"></q-img>
                    <q-card-section>
                      <div>
                        <div class="text-h6 q-mb-xs">
                          {{ result.name }}
                          <span class="float-right"><q-btn flat round icon="fa-solid fa-ellipsis"
                              @click="revisePhoto(result)" /></span>
                        </div>
                      </div>
                      <div class="text-subtitle2">{{ result.content }}</div>
                      <div class="text-subtitle2 text-right">Artist - {{ result.userName }}</div>
                    </q-card-section>
                  </div>
                </q-scroll-area>
              </q-card>
            </q-dialog>
            <!-- delete dialog -->
            <q-dialog v-model="imgDeleteTrue[index]" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="fa-solid fa-triangle-exclamation" color="red" text-color="white" size="xl" />
                  <span class="q-ml-sm">你確定要刪掉這張照片</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="取消" color="primary" v-close-popup />
                  <q-btn flat label="確定" color="primary" v-close-popup @click="imgDelete" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
      <!-- ptt -->
      <div class="q-pa-xl contentBox" style="background-color:whitesmoke;" >
        <!-- 話題跟按鈕 -->
        <div>
          <div class="text-h4 text-left">你的話題 <span class="float-right"><q-btn round color="white" text-color="black"
                icon="add" @click="openAllThemeCreatePTTDialog" /></span></div>
        </div>
        <!-- pttCreateDialog -->
        <div>
          <q-dialog v-model="createPTTDialog">
            <q-card>
              <q-form @submit="allThemeSubmit">

                <q-card-section>
                  <div v-if="!reviseAboutMeBoolean" class="text-h6">{{ revisePttId.length > 0 ? '修改話題' : '新增話題' }}</div>
                  <div v-else class="text-h6">編輯 About Me</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 50vh ; width: 25vw;" class="scroll">
                  <!-- VueFileAgent 上傳圖片的套件 -->
                  <!-- :max-files="1" 有綁是數字，沒綁是文字 -->
                  <!-- :multiple="false" 這個事是否同意多檔上傳 -->
                  <VueFileAgent v-model="allThemePTTData.files" v-model:raw-model-value="allThemePTTData.rawFiles"
                    :max-files="1" max-size="1MB" accept="image/jpg,image/jpeg,image/png" :multiple="false"
                    :error-text="{ type: '檔案格式錯誤', size: '檔案太大' }" help-text="需要上傳圖片請選擇檔案或拖放到這裡" class="q-mb-md">
                  </VueFileAgent>
                  <q-input v-if="!reviseAboutMeBoolean" filled type="text" v-model="allThemePTTData.head" label="標題 *"
                    lazy-rules :rules="[val => !!val || '缺少標題',]" />
                  <q-input v-if="!reviseAboutMeBoolean" filled type="textarea" v-model="allThemePTTData.content"
                    label="介紹 *" lazy-rules :rules="[val => !!val || '缺少內容',]" />
                  <q-input v-else filled type="textarea" v-model="allThemePTTData.content" label="介紹 *" lazy-rules />
                  <q-select v-if="!reviseAboutMeBoolean" filled v-model="allThemePTTData.theme" :options="themeOptions"
                    label="類別 *" />
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn label="送出" type="submit" color="primary" :loading="loading" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>
        </div>
        <!-- 迴圈話題 -->
        <div class="row wrap q-mt-md">
          <div class="col-4 pttBox q-pa-sm" v-for="(box, i) in saveUserPTTs" :key="i">
            <div class="PTTInSideBox">
              <q-btn class="PTTInSideBoxBtn" color="grey" label="more" @click="controllerEditorDialog(i)" />
              <q-btn flat round color="grey" size="sm" icon="delete" class=" absolute " style="top: 10px;right: 10px;"
                @click="pttWantDelete(i)" />
              <div class="text-center text-h5 q-pt-sm
              q-ml-md q-mr-md">{{ box.head }}</div>
              <div class="text-weight-regular text-left q-ml-md">{{ box.content }}</div>
            </div>
          </div>
        </div>
        <!-- 顯示全部 pttDialog -->
        <q-dialog v-model="pttOpenDialog">
          <q-card class="pttDialog">
            <q-card-section class="activityMainBox">
              <div class="text-h5 text-center">{{ pttDialogData.head }}</div>
              <div class="text-weight-regular text-left q-ml-md">{{ pttDialogData.content }}</div>
              <q-btn class="absolute" style="right: 0px; bottom: 0;" flat round icon="fa-solid fa-ellipsis"
                @click="revisePTT" />
            </q-card-section>
            <!-- 留言部份 -->
            <q-scroll-area class="q-mt-lg" style="height:40vh; width:100%;">
              <q-item v-for="(box, i) in pttDialogData.messageBoard" :key="i">
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
              <!-- 回應留言按鈕 -->
              <q-item-section top class="text-center">
                <q-btn color="teal-4" icon="fa-regular fa-comment" label="留言" @click="editorDialog = true" />
              </q-item-section>
            </q-scroll-area>
          </q-card>
        </q-dialog>
        <!-- 留言dialog -->
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
      </div>
      <!-- activity -->
      <div class="q-pa-xl contentBox">
        <div>
          <div class="text-h4 text-left">你的活動 <span class="float-right"><q-btn round color="white" text-color="black"
                icon="add" @click="createActivity" /></span></div>
        </div>
        <!-- CreateActivityDialog -->
        <div>
          <q-dialog v-model="createActivityDialog">
            <q-card>
              <q-form @submit="createActivitySubmit">

                <q-card-section>
                  <div class="text-h6">新增活動</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 50vh ; width: 25vw;" class="scroll">
                  <!-- VueFileAgent 上傳圖片的套件 -->
                  <!-- :max-files="1" 有綁是數字，沒綁是文字 -->
                  <!-- :multiple="false" 這個事是否同意多檔上傳 -->
                  <VueFileAgent v-model="activityData.files" v-model:raw-model-value="activityData.rawFiles"
                    :max-files="1" max-size="1MB" accept="image/jpg,image/jpeg,image/png" :multiple="false"
                    :error-text="{ type: '檔案格式錯誤', size: '檔案太大' }" help-text="活動圖片請選擇檔案或拖放到這裡" class="q-mb-md">
                  </VueFileAgent>
                  <q-input filled type="text" v-model="activityData.head" label="活動標題 *" lazy-rules
                    :rules="[val => !!val || '缺少活動標題',]" />
                  <q-input filled type="textarea" v-model="activityData.content" label="內容介紹 *" lazy-rules
                    :rules="[val => !!val || '缺少內容介紹',]" />
                  <q-select filled v-model="activityData.theme" :options="themeOptions" label="類別 *"
                    :rules="[val => !!val || '缺少類別',]" />
                  <!-- 時間區域 -->
                  <div class="q-mt-md" style="width: 100%;">
                    <q-input filled v-model="activityData.date" :rules="[val => !!val || '缺少日期時間',]">
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="activityData.date" mask="YYYY-MM-DD HH:mm">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>

                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointloadinger">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="activityData.date" mask="YYYY-MM-DD HH:mm">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn label="送出" type="submit" color="primary" :loading="loading" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>
        </div>
        <!-- 活動迴圈 -->
        <div class="row wrap q-mt-md">
          <div class="col-4 pttBox q-pa-sm" v-for="(box, i) in saveUserActivity" :key="i">
            <div class="PTTInSideBox">
              <q-btn class="PTTInSideBoxBtn" color="grey" label="參加人員" @click="controllerActivityDialog(i)" />
              <q-btn flat round color="grey" size="sm" icon="delete" class=" absolute " style="top: 10px;right: 10px;"
                @click="activityWantDelete(i)" />
              <div class="text-center text-h5 q-pt-sm
              q-ml-md q-mr-md">{{ box.head }}</div>
              <div class="text-weight-regular text-left q-ml-md">{{ box.content }}</div>
            </div>
          </div>
        </div>
        <q-dialog v-model="activityOpenDialog">
          <div class="q-pa-md q-ma-md">
            <q-markup-table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>email</th>
                </tr>
                <tr v-for="(value, idx) in saveUserActivity[saveActivityIndex].join" :key="idx">
                  <td>{{ value.account }}</td>
                  <td>{{ value.email }}</td>
                </tr>
              </thead>
            </q-markup-table>
          </div>
        </q-dialog>
      </div>
      <!-- 你參與的活動 -->
      <div class="q-pa-xl contentBox" style="background-color:whitesmoke;">
        <div class="text-h4 text-left">參與的活動</div>
        <div class="row">
          <q-card v-for="(value, idx) in saveJoinActivity" :key="idx"
            class="q-mt-md q-ml-md col-2 my-card  ">
            <q-card-section>
              <div class="text-h6">{{ value.head }}</div>
              <div class="text-subtitle2 text-left q-mt-xs">{{ value.content }}</div>
            </q-card-section>

            <q-card-section align="right">
              時間 ：{{ new Date(value.date).toLocaleDateString() }}
            </q-card-section>

            <q-separator dark />

            <q-card-actions align="right">
              <q-btn @click="removeJoinActivity(idx)" flat>取消參與</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user'
import { ref, reactive } from 'vue'
import { apiAuth } from 'src/boot/axios'

const user = useUserStore()
const $q = useQuasar()
const saveUserImage = ref()
const createImg = ref(false)
const imgFixedTrue = ref([])
const imgDeleteTrue = ref([])
const deleteId = ref()
const revisePhotoId = ref('')
const loading = ref(false)
const aboutMeData = ref({ aboutMe: '', mainImg: 'https://github.com/chunyenlee1996.png' })
// 判斷是否從aboutMe點進來的
const reviseAboutMeBoolean = ref(false)

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

const getImage = async () => {
  try {
    const { data } = await apiAuth.get('/images/UserImage', {
      params: {
        search: user.userId
      }
    })
    saveUserImage.value = data.result
  } catch (error) {

  }
}
getImage()
const imgFixed = (index) => {
  // console.log(imgFixedTrue)
  imgFixedTrue.value[index] = true
}

const imgWantDelete = (index) => {
  // console.log(imgFixedTrue)
  imgDeleteTrue.value[index] = true
  deleteId.value = saveUserImage.value[index]._id
}
// 刪除圖片
const imgDelete = async () => {
  try {
    await apiAuth.delete(`/images/${deleteId.value}`)
    getImage()
    $q.notify({
      message: 'success',
      caption: '刪除成功',
      color: 'secondary'
    })
  } catch (error) {
    console.log(deleteId.value)
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
  revisePhotoId.value = ''
  loading.value = false
}
// 點擊新增照片按鈕
const clickCreateImg = () => {
  resetForm()
  createImg.value = true
}
// 送出圖片
const onSubmit = async (value) => {
  // if (imgData.files.length === 0) return
  try {
    loading.value = true
    const fd = new FormData()
    // fd.append('userId', value.imgData.userId)
    fd.append('name', imgData.name)
    fd.append('content', imgData.content)
    fd.append('formTheme', imgData.formTheme)
    if (imgData.files !== undefined || revisePhotoId.value.length === 0) fd.append('imgURL', imgData.files[0].file)
    if (imgData.files !== undefined || revisePhotoId.value.length === 0) fd.append('rawFiles', imgData.rawFiles[0])

    if (revisePhotoId.value.length > 0) {
      await apiAuth.patch('/images/' + revisePhotoId.value, fd)
      $q.notify({
        message: 'success',
        caption: '修改成功',
        color: 'secondary'
      })
    } else {
      await apiAuth.post('/images', fd)
      $q.notify({
        message: 'success',
        caption: '新增成功',
        color: 'secondary'
      })
    }
    createImg.value = false
    resetForm()
    getImage()
  } catch (error) {
    console.log(error)
    console.table(imgData)
    console.log(imgData.files[0].file)
    $q.notify({
      message: 'error',
      caption: '新增失敗',
      color: 'red'
    })
  }
}
// 修改圖片
const revisePhoto = async (data) => {
  reviseAboutMeBoolean.value = false
  revisePhotoId.value = data._id

  imgData.name = data.name
  imgData.content = data.content
  imgData.formTheme = data.theme
  imgData.files = data.files
  imgData.rawFiles = data.rawFiles

  console.table(data)
  createImg.value = true
}
// 取得 aboutMe
const getAboutMe = async () => {
  try {
    const { data } = await apiAuth.get('/users/me')
    aboutMeData.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getAboutMe()
// 修改 aboutMe
const reviseAboutMe = async () => {
  resetPTTForm()
  allThemePTTData.content = aboutMeData.value.aboutMe
  reviseAboutMeBoolean.value = true
  createPTTDialog.value = true
}
// 以下 ptt 專區

// createPTTDialog 開關預設
const createPTTDialog = ref(false)
const pttOpenDialog = ref(false)
const editorDialog = ref(false)
const saveUserPTTs = ref()
const UserResponseForActivity = ref('')
const pttDialogData = ref({ head: '', content: '', messageBoard: [] })
const revisePttId = ref('')
// openAllThemeCreatePTTDialog
const openAllThemeCreatePTTDialog = () => {
  reviseAboutMeBoolean.value = false
  resetPTTForm()
  createPTTDialog.value = true
}
// 清空表單
const resetPTTForm = () => {
  allThemePTTData.head = ''
  allThemePTTData.content = ''
  allThemePTTData.theme = ''
  allThemePTTData.files = ''
  allThemePTTData.rawFiles = ''
  revisePttId.value = ''
  loading.value = false
}
const allThemePTTData = reactive({
  head: '',
  content: '',
  theme: '',
  files: [],
  rawFiles: []
})
const allThemeSubmit = async (value) => {
  try {
    loading.value = true
    const fd = new FormData()
    // fd.append('userId', value.imgData.userId)
    fd.append('head', allThemePTTData.head)
    fd.append('content', allThemePTTData.content)
    fd.append('theme', allThemePTTData.theme)
    if (allThemePTTData.files[0] !== undefined) fd.append('imgURL', allThemePTTData.files[0].file)

    if (revisePttId.value.length > 0) {
      await apiAuth.patch(`/PTTs/${revisePttId.value}`, fd)
      $q.notify({
        message: 'success',
        caption: '新增成功',
        color: 'secondary'
      })
    } else if (reviseAboutMeBoolean.value) {
      const aboutMeFd = new FormData()
      aboutMeFd.append('aboutMe', allThemePTTData.content)
      if (allThemePTTData.files[0] !== undefined) aboutMeFd.append('imgURL', allThemePTTData.files[0].file)
      await apiAuth.post(`/users/${user.userId}`, aboutMeFd)
      getAboutMe()
      $q.notify({
        message: 'success',
        caption: '更改成功',
        color: 'secondary'
      })
    } else {
      await apiAuth.post('/PTTs', fd)
      $q.notify({
        message: 'success',
        caption: '新增成功',
        color: 'secondary'
      })
    }
    createPTTDialog.value = false
    resetPTTForm()
    getPTTs()
  } catch (error) {
    console.log(error)
    $q.notify({
      message: 'error',
      caption: '新增失敗',
      color: 'red'
    })
  }
}
// 迴圈跑ptt文章
const getPTTs = async () => {
  try {
    const { data } = await apiAuth.get('/PTTs/UserPTTs', {
      params: {
        search: user.userId
      }
    })
    saveUserPTTs.value = data.result
  } catch (error) {

  }
}
getPTTs()
// 將點擊 more 資訊放進 pttDialogData 裏面
const controllerEditorDialog = (index) => {
  pttOpenDialog.value = true
  pttDialogData.value = saveUserPTTs.value[index]
}
// 傳送編輯器內容
const editorSend = async () => {
  try {
    await apiAuth.post(`PTTs/${pttDialogData.value._id}`, {
      message: UserResponseForActivity.value
    })
    pttDialogData.value.messageBoard.push({ avatar: user.avatar, message: UserResponseForActivity.value, userName: user.userName })
    UserResponseForActivity.value = ''
    editorDialog.value = false
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
// 關閉編輯器
const editorRemove = () => {
  UserResponseForActivity.value = ''
  editorDialog.value = false
}
// 刪除 ptt 文章按鈕
const pttWantDelete = async (index) => {
  try {
    await apiAuth.delete(`/PTTs/${saveUserPTTs.value[index]._id}`)
    getPTTs()
    $q.notify({
      message: 'success',
      caption: '成功刪除討論版',
      color: 'secondary'
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      message: 'error',
      caption: '請登入帳號',
      color: 'red'
    })
  }
}
// 修改 ptt 按鈕
const revisePTT = () => {
  try {
    revisePttId.value = pttDialogData.value._id
    allThemePTTData.head = pttDialogData.value.head
    allThemePTTData.content = pttDialogData.value.content
    allThemePTTData.theme = pttDialogData.value.theme
    allThemePTTData.files = pttDialogData.value.files
    reviseAboutMeBoolean.value = false
    createPTTDialog.value = true
  } catch (error) {

  }
}
// 以下為 activity專區
// 設定活動對話框開關按鈕
const createActivityDialog = ref(false)
const saveUserActivity = ref({ head: '', content: '', imgURL: '', join: [] })
const activityOpenDialog = ref(false)
const saveActivityIndex = ref(0)
const saveJoinActivity = ref({ head: '', date: '', çcontent: '' })
// 儲存活動的資料區
const activityData = reactive({
  head: '',
  content: '',
  files: '',
  rawFiles: '',
  date: '',
  theme: ''
})
// 清空活動資料存放區
const clearActivityData = () => {
  activityData.head = ''
  activityData.content = ''
  activityData.files = ''
  activityData.rawFiles = ''
  activityData.date = ''
  activityData.theme = ''
}
// 創建活動按鈕點擊後
const createActivity = () => {
  clearActivityData()
  createActivityDialog.value = true
}
// 創建的活動送出
const createActivitySubmit = async () => {
  try {
    loading.value = true
    const fd = new FormData()
    fd.append('head', activityData.head)
    fd.append('content', activityData.content)
    fd.append('date', activityData.date)
    fd.append('imgURL', activityData.files[0].file)
    fd.append('theme', activityData.theme)
    await apiAuth.post('/activity/', fd)
    createActivityDialog.value = false
    getActivity()
    $q.notify({
      message: 'success',
      caption: '新增成功',
      color: 'secondary'
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      message: 'error',
      caption: '新增失敗',
      color: 'red'
    })
  }
}
// 迴圈跑活動資料
const getActivity = async () => {
  try {
    const { data } = await apiAuth.get('/activity/userActivity')
    saveUserActivity.value = data.result
    console.log(data)
  } catch (error) {

  }
}
getActivity()
// 刪除 ptt 文章按鈕
const activityWantDelete = async (index) => {
  try {
    await apiAuth.delete(`/activity/${saveUserActivity.value[index]._id}`)
    getActivity()
    $q.notify({
      message: 'success',
      caption: '成功刪除討論版',
      color: 'secondary'
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      message: 'error',
      caption: '請登入帳號',
      color: 'red'
    })
  }
}
// 點擊活動dialog
const controllerActivityDialog = (index) => {
  saveActivityIndex.value = index
  activityOpenDialog.value = true
}
// 跑參與的活動
const getJoinActivity = async () => {
  const { data } = await apiAuth.get('/activity/userJoinActivity')
  saveJoinActivity.value = data.result
}
getJoinActivity()
// 取消參加活動
const removeJoinActivity = async (index) => {
  try {
    await apiAuth.patch(`/activity/${saveJoinActivity.value[index]._id}`)
    getActivity()
    getJoinActivity()
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
</script>
<style scoped>
#aboutMe {
  width: 100%;
  height: 300px;
  /* background-color: #a16666; */
}

.aboutMEBox {
  width: 400px;
  height: 220px;
  /* background-color: #333; */
}

.contentBox {
  width: 100%;
  /* background-color: #a16666; */
}

#aboutMeRight {
  width: 200px;
}

/* ptt專區 */
.pttBox {
  border: 1px dashed rgb(163, 162, 162);
  height: 200px;
  position: relative;
}

.PTTInSideBox {
  background-color: white;
  width: 100%;
  height: 100%;
}

.PTTInSideBoxBtn {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.activityMainBox {
  height: 350px;
  border-bottom: 1px solid #333;
}

.pttDialog {
  width: 80vh;
}

.editorDialogContainer {
  width: 600px;
  background-color: #fff;
}
</style>
