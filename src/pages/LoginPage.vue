<template>
  <q-page-container class="row justify-center items-center">
    <q-card class=" row my-card justify-center items-center" style="width: 35vh; height: 60vh;">
      <div class="column items-center" style="height: 150px">
        <div class="text-h4 col text-weight-bold q-mt-xl">攝時</div>
        <div class="col q-mt-md">
          <div style="border-bottom: 1px solid #888;">Share your idea</div>
        </div>
      </div>
      <q-form @submit="onSubmit" @reset="onReset" class=" col-12 q-gutter-md">
        <div class="q-pa-md" style="max-width: 400px; ">
          <q-input filled v-model="account" label="account *" lazy-rules :rules="[
            val => !!val || '請輸入帳號',
            val => val.length > 3 || '最少 4 個字',
            val => val.length < 20 || '最多 20 個字'
          ]" />

          <q-input filled type="password" v-model="password" label="password *" lazy-rules :rules="[
            val => !!val || '請輸入密碼',]" />

          <div>
            <q-btn label="送出" type="submit" color="primary" :loading="loading"/>
          </div>
          <div class="text-right">
            <q-btn flat color="primary" label="註冊" to="/RegisterPage" />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-page-container>
  <!-- 參考網站：http://chainan.cosmo-br.tw/ -->
  <section id="marquee">
    <div class="view">
      <div class="pic-container">
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=90" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=80" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=70" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=60" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=50" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=40" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=30" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=2" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1" alt="" />
        </div>
      </div>
    </div>
    <div class="view">
      <div class="pic-container2">
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
      </div>
    </div>
    <div class="view">
      <div class="pic-container3">
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
      </div>
    </div>
    <div class="view">
      <div class="pic-container4">
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
      </div>
    </div>
    <div class="view">
      <div class="pic-container5">
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=10" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar'
// onMounted 頁面出現之後要做的事
import { ref } from 'vue'
// 拉進來跳頁用
import { useRouter } from 'vue-router'
// axios 前端發送請求用
import { api } from 'src/boot/axios'
// 將 pinia 的資訊拉進來
import { useUserStore } from 'src/stores/user'

const $q = useQuasar()
const router = useRouter()
const user = useUserStore()

const account = ref('')
const password = ref('')
const loading = ref(false)
const onSubmit = async (value) => {
  try {
    loading.value = true
    const { data } = await api.post('/users/login', {
      account: account.value,
      password: password.value
    })
    console.log(data)
    user.login({
      token: data.result.token,
      userName: data.result.userName,
      account: data.result.account,
      email: data.result.email,
      phoneNumber: data.result.phoneNumber,
      role: data.result.role,
      avatar: data.result.avatar,
      userId: data.result.userId
    })
    loading.value = false
    $q.notify({
      message: 'success',
      caption: '登入成功',
      color: 'secondary'
    })
    // 成功跳登入頁
    router.push('/UserPage')
  } catch (error) {
    console.log(error)
    $q.notify({
      message: error.response.data.message,
      caption: '登入失敗',
      color: 'red'
    })
  }
}
</script>
<style scoped>

</style>
