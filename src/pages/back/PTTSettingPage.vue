<template>
    <div class="q-mb-md q-mt-xl text-center text-h2 text-weight-medium text-uppercase">Topics</div>
  <!-- search bar -->
  <div class="q-pa-xl row justify-center">
    <q-form @submit="onSubmit" class="q-gutter-md col-9">
      <q-input name="theme" v-model="search" color="primary" label="搜尋類型" filled
        hint="可搜尋 ： 作者、類型、標題">
      </q-input>
    </q-form>
  </div>
  <!-- 表單 -->
  <div class="q-pa-md">
    <q-table wrap-cells title="論壇管理" :rows="rows" :columns="columns" row-key="name" :filter="search">
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
  { name: 'head', required: true, label: '標題', align: 'left', field: 'head' },
  { name: 'content', label: '內容', field: 'content', align: 'left' },
  { name: 'userName', label: '作者', field: 'userName', align: 'left', sortable: true },
  { name: 'theme', label: '類別', field: 'theme', align: 'left', sortable: true },
  { name: 'deleteImg', label: '刪除', field: 'deleteImg', align: 'left', sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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
