import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useUserStore } from 'src/stores/user'
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// 這行在之後使用 api.post('') 時會自動幫你補 import.meta.env.VITE_API 像下面範例
// api.post('/users') = api.post('import.meta.env.VITE_API/users')
// ＝ api.post('http://localhost:4000/users')
// axios.create( 使用這裡面的預設設定 ) = 新建立了一個 axios 的物件，這樣才不會影響到原本的 axios
// axios.default.baseURL = import.meta.env.VITE_API (一樣是改預設值，但會把原本的也改掉)
// 要建立新的的原因是因為如果之後有要串其他網路上的 api 還有原本的可以使用
// 如果要在 vue 裡面使用的話要這樣寫 : import.meta.env
const api = axios.create({ baseURL: import.meta.env.VITE_API })
// 只要傳 jwt 的請求都用這個傳，因為下面有寫攔截器
const apiAuth = axios.create({ baseURL: import.meta.env.VITE_API })

// interceptors 攔截器、 config 配置、 Authorization 授權
// 應用流程
// 1. 呼叫 axios.get axios.post 時
// 2. interceptors.request 請求攔截器
// 3. 送出請求
// 4. interceptors.response 回應攔截器
// 5. 呼叫 axios 的 .then() catch()
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  // Bearer 是一個 HTTP認證 headers 的類型
  config.headers.authorization = 'Bearer ' + user.token
  return config
})

// 運作順序範例
// 1. getProfile
// 2. 如果發生登入逾時錯誤
// 3. 傳送舊換新請求
// 4. 如果舊換新成功，修改 getProfile 請求的 jwt 後重新送出
// 5. 如果舊換新失敗，將 getProfile 的錯誤回傳
// 6. 如果不是登入逾時錯誤，將 getProfile 的錯誤回傳

// axios.interceptors.response.use(成功執行的 function, 失敗執行的 function)
apiAuth.interceptors.response.use(res => {
  return res
}, error => {
  // 如果有收到回應
  if (error.response) {
    // 如果是 JWT 過期的錯誤，且不是舊換新請求
    if (error.response.data.message === '登入逾時' && error.config.url !== '/users/extend') {
      const user = useUserStore()
      // 傳送 JWT 舊換新請求
      return apiAuth.patch('/users/extend')
        .then(({ data }) => {
          // 如果舊換新成功，更新 user store 的 JWT
          user.token = data.result
          // 修改原發生錯誤的請求的 JWT
          error.config.headers.authorization = 'Bearer ' + user.token
          // 重新傳送原請求
          return axios(error.config)
        })
        .catch(() => {
          // 如果舊換新失敗，登出
          user.logout()
          // 回傳原錯誤到呼叫 axios 的地方
          return Promise.reject(error)
        })
    }
  }
  // 如果失敗的請求沒回應，或不是過期，回傳原錯誤到呼叫 axios 的地方
  return Promise.reject(error)
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  // 引用圖片上傳套件
  app.use(VueFileAgentNext)
})

export { api, apiAuth }
