<template>
  <div class='main'>
    <h1 class='header'>Добавить трату</h1>
    <AddSpendingForm :people-who='peopleWho' :people-whom='peopleWhom' @add-spending='addSpending' />
    <h2 class='subheader'>Все траты</h2>
    <SpendingList :spending-list='spendingListFiltered' />
    <h2 class='subheader'>Статистика</h2>
    <div>
      <input id='showSummed' v-model='showSum' type='checkbox'>
      <label for='showSummed'>Показывать сумму долгов</label>
    </div>
    <SumTable
      :people='peopleWho'
      :table='showSum ? statsTable?.summed : statsTable?.non_summed'
      @filter-by-debtor='filterByDebtor'
      @filter-by-pair='filterByPair'
      @filter-clear='clearFilter'
    />
  </div>
</template>

<script lang="ts">
import { ref, useFetch } from '@nuxtjs/composition-api'
import Vue from 'vue'
import { addRow, allRows, getStatistics } from '~/db/googleheets'
import SumTable from '~/components/SumTable.vue'
import SpendingList from '~/components/SpendingList.vue'
import AddSpendingForm from '~/components/AddSpendingForm.vue'

export type Person = {
  id: number,
  name: string,
  bgColor: string,
  textColor: string
}

export type Spending = {
  who: Person,
  whom: Person,
  sum: number,
  comment: string,
}

export type SpendingFormData = {
  who: string,
  whom: string,
  sum: number,
  comment: string,
}

type NamesPair = {
  buyerName: string,
  debtorName: string,
}

type StatsTable = {}

type StatsTablePair = {
  summed: StatsTable
  non_summed: StatsTable
}

export default Vue.extend({
  name: 'Home',
  components: { AddSpendingForm, SpendingList, SumTable },
  setup() {
    const peopleWho: Person[] = [
      { id: 1, name: 'Антон', bgColor: '#FFCDD2', textColor: '#F44336' },
      { id: 2, name: 'Лера', bgColor: '#F8BBD0', textColor: '#E91E63' },
      { id: 3, name: 'Рома', bgColor: '#E1BEE7', textColor: '#9C27B0' },
      { id: 4, name: 'Эльнур', bgColor: '#D1C4E9', textColor: '#673AB7' },
    ]

    const peopleWhom: Person[] = [
      ...peopleWho,
      { id: 5, name: 'Всем', bgColor: '#CFD8DC', textColor: '#607D8B' }
    ]

    const headings = ref<string[]>([])
    const spendingList = ref<Spending[]>([])
    const spendingListFiltered = ref<Spending[]>([])
    const statsTable = ref<StatsTablePair>({} as StatsTablePair)
    const showSum = ref<boolean>(true)

    async function addSpending(formData: SpendingFormData) {
      await addRow({ who: formData.who, whom: formData.whom, sum: formData.sum, comment: formData.comment });
      clearFilter();

      spendingList.value.unshift({
        who: peopleWho.find(p => p.name === formData.who) || {} as Person,
        whom: peopleWhom.find(p => p.name === formData.whom) || {} as Person,
        sum: formData.sum,
        comment: formData.comment
      })

      statsTable.value = await getStatistics();
    }

    function filterByDebtor(name: string) {
      spendingListFiltered.value = spendingList.value.filter((spending: Spending) => spending.whom.name === name)
    }

    function filterByPair({ buyerName, debtorName }: NamesPair) {
      spendingListFiltered.value = spendingList.value.filter(
        (spending: Spending) => spending.who.name === buyerName && spending.whom.name === debtorName ||
          spending.who.name === debtorName && spending.whom.name === buyerName
      )
    }

    function clearFilter() {
      spendingListFiltered.value = spendingList.value;
    }

    useFetch(async () => {
      const [data, statistics] = await Promise.all([
        allRows(),
        getStatistics(),
      ]);

      statsTable.value = statistics;

      headings.value = data.values[0]
      data.values.splice(0, 1)
      spendingList.value = data.values.reverse().map(row => ({
        who: peopleWho.find(p => p.name === row[0]) || {} as Person,
        whom: peopleWhom.find(p => p.name === row[1]) || {} as Person,
        sum: parseFloat(row[2].replace(",", "")),
        comment: row[3]
      }))

      spendingListFiltered.value = spendingList.value;
    })

    return {
      addSpending,
      filterByDebtor,
      filterByPair,
      clearFilter,
      spendingList,
      spendingListFiltered,
      peopleWho,
      peopleWhom,
      statsTable,
      showSum,
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
select, input {
  padding: 8px 12px;
  border: 2px solid #3B666B;
  border-radius: 8px;
}

.subheader {
  font-size: 32px;
  margin-top: 40px;
  padding-left: 32px;
  width: 100%;
  text-align: center;
}
</style>
