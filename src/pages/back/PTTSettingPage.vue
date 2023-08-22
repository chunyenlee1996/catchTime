<template>
  <!-- search bar -->
  <div class="q-pa-xl row justify-center">
    <q-form @submit="onSubmit" class="q-gutter-md col-9">
      <q-input name="theme" v-model="search" color="primary" label="搜尋類型" filled
        hint="風景攝影, 人像攝影, 動態攝影, 建築攝影, 靜物攝影, 紀實攝影, 實驗性攝影, 其他">
        <q-btn flat :ripple="false" text-color="blue" icon="search" size="lg" @click="searchImgData" />
      </q-input>
    </q-form>
  </div>
  <!-- 表單 -->
  <div class="q-pa-md">
    <q-table title="論壇管理" :rows="rows" :columns="columns" row-key="name" :filter="search">
      <template v-slot:body-cell-imgURL="props">
        <q-td :props="props">
          <q-img :src="props.row.imgURL" style="width: 50px; height: 50px;"></q-img>
        </q-td>
      </template>
      <template v-slot:body-cell-deleteImg="props">
        <q-td :props="props">
          <q-btn flat round color="primary" size="xs" icon="delete" @click="clickToDelete(props.row._id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
// 存選擇刪除的值
// const selected = ref([])
// 存 search bar 的值
const search = ref('')
const columns = [
  {
    name: 'name',
    required: true,
    label: '作品名稱',
    align: 'center',
    field: 'name'
  },
  { name: 'imgURL', align: 'center', label: '圖片', field: 'imgURL' },
  { name: 'userName', label: '作者', field: 'userName', align: 'center', sortable: true },
  { name: 'content', label: '內容', field: 'content', align: 'center' },
  { name: 'theme', label: '類別', field: 'theme', align: 'center', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'deleteImg', label: '刪除', field: 'deleteImg', align: 'center', sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]
const rows = ref()
const result = async () => {
  try {
    const { data } = await api.get('/PTTs/all')
    rows.value = data.result
  } catch (error) {

  }
}
result()
const clickToDelete = async (value) => {
  await apiAuth.delete(`/PTTs/${value}`)
  result()
}
</script>
