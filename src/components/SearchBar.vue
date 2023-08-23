<template>
  <div class="q-pa-xl row justify-center">
    <!-- @submit="$emit('SearchTheme', theme)" 後面的是要帶出去的值(ex. theme) -->
    <q-form @submit="$emit('SearchTheme', theme)" class="q-gutter-md col-9">
      <q-input name="theme" v-model="theme" color="primary" label="搜尋類型" filled
        hint="可搜尋 ： 作者、類型、標題">
        <q-btn flat :ripple="false" text-color="blue" icon="search" size="lg" type="submit" />
      </q-input>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const theme = ref('')
// searchTheme 的 function
// 定義事件
defineEmits(['SearchTheme'])
</script>
