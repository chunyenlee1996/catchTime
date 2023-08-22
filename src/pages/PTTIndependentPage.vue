<template>
  <div class="topic-bg"/>
  <!-- display content -->
  <div class="absolute-top contentContainer">
      <q-btn class="q-mb-md q-mr-md fixed-bottom-right" color="teal-2" icon="fa-solid fa-angles-left" label="back" to="/PTTPage" />
      <div class="PTTContainerLeft absolute-center q-mt-md">
      <div class="absolute-top-left q-ma-xl">
        <div class="text-h5 text-weight-medium" style="font-size: 30px;">Discovery</div>
        <div class="q-mt-xs text-caption"> - {{ route.params.theme }}</div>
      </div>
      <SearchBar class="PTTSearchBar"  @SearchTheme="getData" />
      <!-- listHeaderGroup 標題列表(left) -->
      <div class="listHeaderGroup ">
        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 100%; width: 100%;">
          <q-item class="q-mr-md" v-for="(box, i) in ActivityData" :key="i" clickable @click="ActivityDataClick(i)" style="border-bottom: 1px solid #333;">
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
            style="height:300px;width: 100%;">
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
        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 40%; width: 100%;">
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

</template>
<script setup>

import { ref } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user'
import SearchBar from 'src/components/SearchBar.vue'

const route = useRoute()
const $q = useQuasar()
const user = useUserStore()

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
    activityDataForOne.value.messageBoard.push({ avatar: user.avatar, message: UserResponseForActivity.value, userName: user.userName })
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

// 取各別主題的資料
const getData = async (value) => {
  try {
    const { data } = await api.get('/PTTs/all', {
      params: {
        theme: route.params.theme,
        search: value
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
.forumTitle {
  margin-left: 665px;
}

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

/* PTTContainerLeft 左邊區域 */
.PTTContainerLeft {
  /* transform: translate(-50%, -50%); */
  width: 80vw;
  height: 80vh;
  border: 1px dashed #333;
  background-color: #fff;
  /* border-radius: 50px; */
}

/* listHeaderGroup 標題列表群 */
.listHeaderGroup {
  float: left;
  width: 35%;
  height:60vh;
  margin-left: 1%;
  border-right: 1px solid#333;
  /* overflow-y: auto; */
}

/* 問題顯示區 */
.questionDisplay {
  float: right;
  width: 60%;
  height: 60vh;
  margin-right: 2%;
  /* border: 1px solid#33333319; */
}

.questionDisplayTop {
  height: 55%;
  border-bottom: 1px solid #333;
}

.editorDialogContainer {
  width: 600px;
  background-color: #fff;
}
.PTTSearchBar{
  width: 70%;
  margin-left: 33%;
}
</style>
