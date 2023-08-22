<template>
  <div class="q-pa-md">
    <q-table title="圖片管理" :rows="rows" :columns="columns" row-key="name" selection="multiple" v-model:selected="selected">
      <template v-slot:body-cell-[imgURL]="props">
        <q-tr :props="props">
        <q-td :key="imgURL">
          {{ props }}
        </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom-row>
        <q-tr>
          <td>
            <q-btn color="primary" icon="check" label="OK" @click="onClick" />
          </td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
const selected = ref([])
const columns = [
  {
    name: 'name',
    required: true,
    label: '作品名稱',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  // name:對應rows的類別、label：顯示的內容、field:目前只知道跟類別名稱一樣不知作用、sortable：布林值，可排序的
  { name: 'imgURL', align: 'center', label: '圖片', field: 'imgURL' },
  { name: 'userName', label: '作者', field: 'userName', align: 'center' },
  { name: 'content', label: '內容', field: 'content', align: 'center', sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'theme', label: '類別', field: 'theme', align: 'center', sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]
const rows = ref()
const result = async () => {
  try {
    const { data } = await api.get('/images/all')
    rows.value = data.result
    console.log(data.result)
  } catch (error) {

  }
}
result()

</script>
