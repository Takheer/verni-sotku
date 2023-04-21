<template>
  <table class='table'>
    <thead>
      <tr>
        <th class='table-header table-header-clickable' @click='clearFilter'>Очистить фильтр</th>
        <th class='table-header' colspan='4'>Кому должен</th>
      </tr>
      <tr>
        <th class='table-header'>Кто должен</th>
        <th v-for='buyer of people' :key='buyer.id' class='table-header'>{{ buyer.name }}</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for='debtor of people' :key='debtor.name'>
      <td
        class='table-cell table-cell-content'
        :class="{'table-cell--selected': selected === debtor.name}"
        @click='filterByDebtor(debtor.name)'
      >
        {{debtor.name}}
      </td>
      <td
        v-for='buyer of people'
        :key='buyer.name'
        class='table-cell'
      >
        <div
          v-if='debtor.name !== buyer.name'
          class='table-cell-content'
          :class="{'table-cell--selected': selected === `${debtor.name}${buyer.name}`}"
          @click='filterByPair(debtor.name, buyer.name)'
        >
          {{ formatCurrency(table[debtor.name][buyer.name].sum) }}
        </div>
        <div v-else class='table-cell-content'>
          —
        </div>
      </td>
    </tr>
    </tbody>
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
    const debtorsList = computed(() => Object.values(props.table))
    const selected = ref<string>('')
    const filtered = ref<boolean>(false)

    const getDebtorList = (debtorName: string) => {
      const buyer = props.table[debtorName]
      return Object.keys(buyer || {})
    }

    function filterByDebtor(debtorName: string) {
      emit('filter-by-debtor', debtorName)
      selected.value = debtorName
      filtered.value = true;
    }

    function filterByPair(debtorName: string, buyerName: string) {
      emit('filter-by-pair', { debtorName, buyerName });
      selected.value = `${debtorName}${buyerName}`
      filtered.value = true
    }

    function clearFilter() {
      emit('filter-clear');
      selected.value = '';
      filtered.value = false;
    }

    function formatCurrency(value: number) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value)
    }

    return {
      debtorsList,
      getDebtorList,
      filterByDebtor,
      filterByPair,
      clearFilter,
      formatCurrency,
      filtered,
      selected,
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
.table-cell-content:hover, .table-cell--selected {
  background-color: #ffff0044;
}
</style>
