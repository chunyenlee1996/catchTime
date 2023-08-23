<template>
      <!-- title -->
      <div class="q-mb-md q-mt-xl text-center text-h2 text-weight-medium text-uppercase">activities</div>
      <div class="text-center text-h4">Embark on a spiritual journey</div>
      <div class="container">
        <div class="activityBox"  v-for="(result,idx) in saveActivityData" :key="idx">
            <img class="activityImg" :src="result.imgURL">
          <div class="activityContent">
            <q-scroll-area style="width:100%; height: 100%;">
              <div class="q-ma-xl text-h3">{{ result.head }}</div>
              <div class="text-h6 q-ma-xl" style="white-space:break-spaces;">{{ result.content }}</div>
              <div class="text-h6 q-ma-xl" style="white-space:break-spaces;">{{ result.mainURL }}</div>
              <div class="text-h6 q-ma-xl" style="white-space:break-spaces;">活動日期 ： {{ new Date(result.date).toLocaleDateString() }}</div>
            </q-scroll-area>
          </div>
          <div class="btn">
            <q-btn v-if="result.join.includes(user.userId.toString())" label="取消參與"
              @click="removeJoinActivity(idx)" v-close-popup />
            <q-btn v-if="!result.join.includes(user.userId.toString())" label="參加活動"
              @click="joinActivity(idx)" v-close-popup />
          </div>
        </div>
      </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user'
import { api, apiAuth } from 'src/boot/axios'

const $q = useQuasar()
const user = useUserStore()

const saveActivityData = reactive([{ head: '', date: '', join: '參加活動' }])

// 取得活動資料
const getActivityData = async () => {
  try {
    const { data } = await api.get('/activity/all')
    saveActivityData.splice(0, saveActivityData.length, ...data.result)
    console.log(data.result)
  } catch (error) {
    console.log(error)
  }
}
const joinActivity = async (value) => {
  try {
    await apiAuth.post(`/activity/${saveActivityData[value]._id}`)
    getActivityData()
    $q.notify({
      message: 'success',
      caption: '參與活動成功',
      color: 'secondary'
    })
  } catch (error) {
    console.log()
    $q.notify({
      message: 'error',
      caption: '參與活動失敗',
      color: 'red'
    })
  }
}
const removeJoinActivity = async (idx) => {
  try {
    await apiAuth.patch(`/activity/${saveActivityData[idx]._id}`)
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
onMounted(() => {
  getActivityData()
})
</script>
<style scoped>
  .container {
    width: calc(100vw - 17.5px);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 50px;
  }
  .activityBox{
    width: 80vw;
    height: 650px;
    position: relative;
    background-color: #eee;
    border-bottom: 1px solid #999;
  }
  .activityImg{
    height: 650px;
    width: 460px;
    object-fit: cover;
    box-sizing: border-box;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #b3b3b3;
    float: left;
  }
  .activityContent{
    height: 650px;
    display: inline-block;
    width: calc(100% - 460px);
  }
  .btn{
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
</style>
