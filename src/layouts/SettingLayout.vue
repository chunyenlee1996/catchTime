<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-blue-grey-6 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title size="md">
          <q-avatar size="xl">
            <q-img src="../assets/white_catchTime.svg" class="q-mr-xs" />
          </q-avatar>
          <span style="font-size: medium;">
            CatchTime 管理後台
          </span>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" class="lt-sm" />
        <q-tabs align="left" class="gt-xs">
          <q-route-tab to="/setting/PhotoSettingPage" label="圖片管理" />
          <q-route-tab to="/setting/PTTSettingPage" label="論壇管理" />
          <q-route-tab to="/setting/ActivitySettingPage" label="活動管理" />
          <q-route-tab to="/IndexPage" label="離開" />
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
import { ref, computed } from 'vue'
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

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

const menuList = computed(() => {
  return [
    {
      iconName: 'fa-regular fa-image',
      label: '圖片管理',
      to: '/setting/PhotoSettingPage',
      show: isAdmin
    },
    {
      iconName: 'fa-regular fa-comment',
      label: '論壇管理',
      to: '/setting/PTTSettingPage',
      show: isAdmin
    },
    {
      iconName: 'fa-regular fa-calendar-check',
      label: '活動管理',
      to: '/setting/ActivitySettingPage',
      show: isAdmin
    },
    {
      iconName: 'fa-solid fa-person-running',
      label: '離開',
      to: '/IndexPage',
      show: true
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
