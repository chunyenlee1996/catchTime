import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from 'src/enums/UserRole'
import { apiAuth } from 'src/boot/axios'

// 改寫成 conversation 的寫法
// state 變成 ref() 跟 reactive()
// getters 變成 computed() ( 可以在 stores 處理，在 return 出去)
// action 變成一般的 function
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userName = ref('')
  const account = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  const role = ref(UserRole.USER)
  const avatar = ref('')
  const userId = ref('')

  // 登入後要存放的內容
  const login = (data) => {
    token.value = data.token
    userName.value = data.account
    account.value = data.account
    email.value = data.email
    phoneNumber.value = data.phoneNumber
    role.value = data.role
    avatar.value = data.avatar
    userId.value = data.userId
  }

  // 判斷有沒有登入
  const isLogin = computed(() => {
    return token.value.length > 0
  })

  // 判斷是不是管理者
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  // 取得使用者資訊，利用 token 來判斷使用者
  const getProfile = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/me')
      userName.value = data.result.userName
      account.value = data.result.account
      email.value = data.result.email
      phoneNumber.value = data.result.phoneNumber
      role.value = data.result.role
      avatar.value = data.result.avatar
      userId.value = data.result.userId
    } catch (error) {
      token.value = ''
    }
  }

  const logout = () => {
    token.value = ''
    userName.value = ''
    account.value = ''
    email.value = ''
    phoneNumber.value = ''
    role.value = ''
    avatar.value = ''
    userId.value = ''
  }

  return {
    token,
    userName,
    account,
    email,
    phoneNumber,
    role,
    avatar,
    userId,
    login,
    isLogin,
    isAdmin,
    getProfile,
    logout
  }
}, {
  // persist 堅持
  // 這個欄位是指存放一些持續性的,就算重新整理也還會留著的
  persist: {
    key: '20230720',
    // paths 路徑
    // paths 可以設定要存哪一些東西
    paths: ['token']
  }
})
