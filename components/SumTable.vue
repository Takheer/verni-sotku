<template>
  <table class='table'>
    <tr>
      <th class='table-header table-header-clickable' @click='clearFilter'>Очистить фильтр</th>
      <th class='table-header' colspan='4'>Кому купил</th>
    </tr>
    <tr>
      <th class='table-header'>Кто купил</th>
      <th v-for='debtor of people' :key='debtor.id' class='table-header'>{{ debtor.name }}</th>
    </tr>
    <tr v-for='buyer of people' :key='buyer.name'>
      <td class='table-cell table-cell-content' @click='filterByBuyer(buyer.name)'>{{buyer.name}}</td>
      <td
        v-for='debtor of people'
        :key='debtor'
        class='table-cell'
      >
        <div v-if='debtor.name !== buyer.name' class='table-cell-content' @click='filterByPair(buyer.name, debtor.name)'>
          {{ table[buyer.name][debtor.name].sum }}
        </div>
        <div v-else class='table-cell-content'>
          —
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { Person } from '~/pages/index.vue'

export default defineComponent({
  name: 'SumTable',
  props: {
    table: {
      type: Object as PropType<any>,
      required: true
    },
    people: {
      type: Array as PropType<Person[]>,
      required: true,
    }
  },
  setup(props, { emit }) {
    const buyersList = computed(() => Object.values(props.table))
    const filtered = ref<boolean>(false)

    const getDebtorList = (buyerName: string) => {
      const debtor = props.table[buyerName]
      return Object.keys(debtor || {})
    }

    function filterByBuyer(buyerName: string) {
      emit('filter-by-buyer', buyerName)
      filtered.value = true;
    }

    function filterByPair(buyerName: string, debtorName: string) {
      emit('filter-by-pair', { buyerName, debtorName });
      filtered.value = true
    }

    function clearFilter() {
      emit('filter-clear');
      filtered.value = false;
    }

    return {
      buyersList,
      getDebtorList,
      filterByBuyer,
      filterByPair,
      clearFilter,
      filtered,
    }
  }
})
</script>

<style>
.table {
  margin-bottom: 72px;
}
.table-header {
  border: 1px solid #555555;
  background-color: #3B666B;
  color: white;
  text-align: left;
  padding: 4px 12px;
}
.table-header-clickable:hover {
  cursor: pointer;
  transition: all 0.2s;
  background-color: #3B666B44;
}
.table-cell {
  border: 1px solid #555555;
}
.table-cell-content {
  cursor: pointer;
  transition: all 0.2s;
  padding: 4px 12px;
}
.table-cell-content:hover {
  background-color: #ffff0044;
}
</style>
