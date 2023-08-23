<template>
  <q-page-container class="row justify-center items-center">
    <q-card class=" row my-card justify-center items-center" style="width: 35vh; height: 60vh;">
      <div class="column items-center" style="height: 150px">
        <div class="text-h4 col text-weight-bold q-mt-xl">攝時</div>
        <div class="col q-mt-md">
          <div style="border-bottom: 1px solid #888;">註冊</div>
        </div>
      </div>
      <q-form @submit="onSubmit" class=" col-12 q-gutter-md">
        <div class="q-pa-md scroll" style="max-width: 400px; ">
          <div class="scroll" style="height: 300px;">
            <q-input filled type="text" v-model="userName" label="user name *" lazy-rules :rules="[
              val => !!val || '請輸入使用者名稱']" />
            <q-input filled type="text" v-model="phoneNumber" label="phone number *" reactive-rules
              :rules="[
                val => !!val || '請輸入電話', val => val.length < 13 || '電話號碼不會超過十個數字', (val) => /^[0-9]{10}$/.test(val) || '必須為數字-09xxxxxxxx']" />
            <q-input filled type="text" v-model="Email" label="Email *" lazy-rules
              :rules="[val => !!val || '請輸入電子信箱', emailRules]" />
            <q-input filled v-model="account" label="account *" lazy-rules :rules="[
              val => !!val || '請輸入帳號',
              val => val.length > 3 || '最少 4 個字',
              val => val.length < 20 || '最多 20 個字',
            ]" />
            <q-input filled type="password" v-model="password" label="password *" reactive-rules :rules="[
              val => !!val || '請輸入密碼', () => confirmPassword === password || '密碼不一致']" />
            <q-input filled type="password" v-model="confirmPassword" label="confirm password *" reactive-rules :rules="[
              val => !!val || '請輸入密碼', () => confirmPassword === password || '密碼不一致']" />
          </div>
          <div>
            <q-btn label="送出" type="submit" color="primary" />
          </div>
          <div class="text-right">
            <div style="border-bottom: 1px solid #888; display: inline-block;">Enjoy your life</div>
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
          <img src="https://picsum.photos/300/300?random=100" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=101" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=102" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=103" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=104" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=105" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=106" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=107" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=108" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=109" alt="" />
        </div>
      </div>
    </div>
    <div class="view">
      <div class="pic-container3">
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1011" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1022" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1033" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1044" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1055" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1066" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1077" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1088" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1099" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1000" alt="" />
        </div>
      </div>
    </div>
    <div class="view">
      <div class="pic-container4">
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1021" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1012" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1032" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1023" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1034" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1043" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1045" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1054" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1056" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1065" alt="" />
        </div>
      </div>
    </div>
    <div class="view">
      <div class="pic-container5">
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1031" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1013" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1024" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1042" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1035" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1053" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1046" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1064" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1577" alt="" />
        </div>
        <div class="pic">
          <img src="https://picsum.photos/300/300?random=1075" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuasar } from 'quasar'
import validator from 'validator'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const phoneNumber = ref('')
const userName = ref('')
const account = ref('')
const password = ref('')
const confirmPassword = ref('')
const Email = ref('')
const emailRules = val => validator.isEmail(val) || '信箱格式錯誤'
const onSubmit = async (value) => {
  console.log(value.target[0].value)
  try {
    // 將資料放進資料庫
    // userName.value 這個取法是因為 input 的 value 會存放到你 v-model 綁定的變數 因為是ref()，所以需要.value
    // 如果是 reactive('') 就不用，不過 reactive('') 只能存放陣列或物件，他不用 .value
    // reactive('') 會對內部的屬性變動做深層的監聽
    // ref('') 不會對物件或陣列內部的屬性變動做監聽
    await api.post('/users', {
      userName: userName.value,
      phoneNumber: phoneNumber.value,
      email: Email.value,
      account: account.value,
      password: password.value
    })
    $q.notify({
      message: 'success',
      caption: '註冊成功',
      color: 'secondary'
    })
    // 成功跳登入頁
    router.push('/LoginPage')
  } catch (error) {
    $q.notify({
      message: 'error',
      caption: '註冊失敗',
      color: 'red'
    })
  }
}
</script>
