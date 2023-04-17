<template>
  <div class='main'>
    <h1 class='header'>Добавить трату</h1>
    <AddSpendingForm :people-who='peopleWho' :people-whom='peopleWhom' @add-spending='addSpending' />
    <h2 class='subheader'>Все траты</h2>
    <SpendingList :spending-list='spendingList' />
<!--    <h2 class='subheader'>Статистика</h2>-->
<!--    <SumTable :people='peopleWho' :table='[]' />-->
  </div>
</template>

<script lang="ts">
import { ref, useFetch } from '@nuxtjs/composition-api'
import Vue from 'vue'
import { addRow, allRows } from '~/db/googleheets'
import SumTable from '~/components/SumTable.vue'
import SpendingList from '~/components/SpendingList.vue'
import AddSpendingForm from '~/components/AddSpendingForm.vue'

export default Vue.extend({
  name: 'Home',
  components: { AddSpendingForm, SpendingList, SumTable },
  setup() {
    const peopleWho = [
      { id: 1, name: 'Антон', bgColor: '#FFCDD2', textColor: '#F44336' },
      { id: 2, name: 'Лера', bgColor: '#F8BBD0', textColor: '#E91E63' },
      { id: 3, name: 'Рома', bgColor: '#E1BEE7', textColor: '#9C27B0' },
      { id: 4, name: 'Эльнур', bgColor: '#D1C4E9', textColor: '#673AB7' },
    ]

    const peopleWhom = [
      ...peopleWho,
      { id: 5, name: 'Всем', bgColor: '#CFD8DC', textColor: '#607D8B' }
    ]

    const headings = ref<string[]>([])
    const spendingList = ref<any[]>([])

    async function addSpending(formData: any) {
      console.log({formData})
      await addRow({who: formData.who, whom: formData.whom, sum: formData.sum, comment: formData.comment});

      spendingList.value.unshift({
        who: peopleWho.find(p => p.name === formData.who),
        whom: peopleWhom.find(p => p.name === formData.whom),
        sum: formData.sum,
        comment: formData.comment
      })
    }

    useFetch(async () => {
      const data = await allRows();

      headings.value = data.values[0]
      data.values.splice(0, 1)
      spendingList.value = data.values.reverse().map(row => ({
        who: peopleWho.find(p => p.name === row[0]),
        whom: peopleWhom.find(p => p.name === row[1]),
        sum: row[2],
        comment: row[3]
      }))
    })

    return {
      addSpending,
      spendingList,
      peopleWho,
      peopleWhom,
    }
  }
})
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
}
.header {
  padding: 24px 40px 0;
  font-size: 40px;
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
}

.form {
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 32px;
  width: 50%;
}
select, input {
  padding: 8px 12px;
  border: 2px solid #3B666B;
  border-radius: 8px;
}
option.disabled {
  color: #999;
}
.add-button {
  background-color: #3B666B;
  color: white;
  border-radius: 16px;
  padding: 12px 16px;
  margin-top: 8px;
}

.subheader {
  font-size: 32px;
  margin-top: 40px;
  padding-left: 32px;
  width: 100%;
  text-align: center;
}

@media screen and (max-width: 500px) {
  .form {
    width: 100%;
  }
}
</style>
