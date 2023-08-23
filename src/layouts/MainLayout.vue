<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-blue-grey-6 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title size="md">
          <q-avatar size="xl">
            <q-img src="../assets/white_catchTime.svg" class="q-mr-xs" />
          </q-avatar>
          <span style="font-size: medium;">
            CatchTime
          </span>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" class="lt-sm" />
        <q-tabs align="left" class="gt-xs">
          <q-route-tab to="/IndexPage" label="首頁" />
          <q-route-tab to="/ImagePage" label="發現" />
          <q-route-tab to="/PTTPage" label="討論" />
          <q-route-tab to="/ActivityPage" label="活動" />
          <q-route-tab to="/LoginPage" label="登入/註冊" v-if="!isLogin" />
          <q-route-tab to="/setting/PhotoSettingPage" label="管理" v-if="isAdmin" />
          <q-route-tab label="登出" v-if="isLogin" @click="logout" />

        </q-tabs>
        <q-tabs align="left">
          <q-route-tab to="/UserPage" v-if="isLogin"><q-avatar><img :src="user.avatar"></q-avatar></q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered dark="true">
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item :to="menuItem.to" v-show="menuItem.show">
          <q-item-section avatar>
            <q-icon :name="menuItem.iconName" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </template>
      <q-item v-if="isLogin" @click="logout" clickable v-ripple><q-item-section avatar><q-icon
            name="fa-solid fa-arrow-right-from-bracket"></q-icon></q-item-section><q-item-section>登出</q-item-section></q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from 'src/stores/user'
// 解構會失去響應性，要加這個才不會失去響應性，或不解構也行(!user.isLogin)
import { storeToRefs } from 'pinia'
import { apiAuth } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const rightDrawerOpen = ref(false)
const user = useUserStore()
const router = useRouter()
// 讓解構有響應性
const { isLogin } = storeToRefs(user)

const { isAdmin } = storeToRefs(user)

// 進到這網頁直接跳頁到首頁
onMounted(() => {
  router.push('/IndexPage')
})
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

const menuList = computed(() => {
  return [
    {
      iconName: 'fa-solid fa-house',
      label: '首頁',
      to: '/IndexPage',
      show: true
    },
    {
      iconName: 'fa-regular fa-image',
      label: '發現',
      to: '/ImagePage',
      show: true
    },
    {
      iconName: 'fa-regular fa-comment',
      label: '討論',
      to: '/PTTPage',
      show: true
    },
    {
      iconName: 'fa-regular fa-calendar-check',
      label: '活動',
      to: '/ActivityPage',
      show: true
    },
    {
      iconName: 'fa-solid fa-arrow-right-to-bracket',
      label: '登入/註冊',
      to: '/LoginPage',
      show: !user.isLogin
    },
    {
      iconName: 'fa-solid fa-gear',
      label: '管理',
      to: '/setting/PhotoSettingPage',
      show: isAdmin
    }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    router.push('/IndexPage')
  } catch (error) {

  }
}

</script>
