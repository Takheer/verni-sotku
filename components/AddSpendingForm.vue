<template>
  <form class='form' @submit.prevent='addSpending'>
    <select id='people' v-model='who'>
      <option class='disabled' value='' disabled selected>Кто купил</option>
      <option v-for='person of peopleWho' :key='person.id' :value='person.name'>{{ person.name }}</option>
    </select>
    <select id='people' v-model='whom'>
      <option class='disabled' value='' disabled selected>Кому купил</option>
      <option v-for='person of peopleWhom' :key='person.id' :value='person.name'>{{ person.name }}</option>
    </select>
    <CalculatorInput placeholder='Сумма' :value='rawSum' @calculate='setCalcValue' @calculate-error='setCalcError'/>
    <div class='calculated-value'>{{ calculatedSum }}</div>
    <div class='calculated-value-error'>{{ calcError }}</div>
    <input v-model='comment' placeholder='Комментарий'>
    <button class='add-button' type='submit'>Добавить</button>
  </form>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CalculatorInput from '~/components/CalculatorInput.vue'

type ValuesPair = {
  value: number
  rawValue: string
}

export default defineComponent({
  name: 'AddSpendingForm',
  components: { CalculatorInput },
  props: {
    peopleWho: {
      type: Array,
      required: true,
    },
    peopleWhom: {
      type: Array,
      required: true,
    }
  },
  setup(_, { emit }) {
    const who = ref<string>('');
    const whom = ref<string>('');
    const rawSum = ref<string>('');
    const comment = ref<string>('');

    const calculatedSum = ref<number | null>(0)
    const calcError = ref<string>('')

    function addSpending() {
      if (!(who.value && whom.value && calculatedSum.value && comment.value)) {
        return;
      }
      rawSum.value = calculatedSum.value.toString();

      emit('add-spending', { who: who.value, whom: whom.value, sum: calculatedSum.value, comment: comment.value })

      who.value = '';
      whom.value = '';
      rawSum.value = '';
      calculatedSum.value = 0;
      comment.value = '';
    }

    function setCalcValue(valuesPair: ValuesPair) {
      calculatedSum.value = valuesPair.value || 0
      rawSum.value = valuesPair.rawValue
      calcError.value = ''
    }

    function setCalcError(value: string) {
      calcError.value = value
      calculatedSum.value = null
    }

    return {
      who,
      whom,
      rawSum,
      comment,
      addSpending,
      setCalcValue,
      setCalcError,
      calculatedSum,
      calcError,
    }
  }
})
</script>

<style>
.form {
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 32px;
  width: 50%;
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

.calculated-value {
  color: #888888;
}

.calculated-value-error {
  color: #ff0000cc;
}

@media screen and (max-width: 768px) {
  .form {
    width: 80%;
  }
}

@media screen and (max-width: 500px) {
  .form {
    width: 100%;
  }
}
</style>
