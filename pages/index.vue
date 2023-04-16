<template>
  <div class='main'>
    <h1 class='header'>Добавить трату</h1>
    <form class='form' @submit.prevent='addSpending'>
      <select id='people' v-model='who'>
        <option class='disabled' value='' disabled selected>Кто купил</option>
        <option v-for='person of people' :key='person' :value='person'>{{ person }}</option>
      </select>
      <select id='people' v-model='whom'>
        <option class='disabled' value='' disabled selected>Кому купил</option>
        <option v-for='person of people' :key='person' :value='person'>{{ person }}</option>
      </select>
      <input v-model='sum' placeholder='Сумма'>
      <input v-model='comment' placeholder='Комментарий'>
      <button class='add-button' type='submit'>Добавить</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, useAsync } from '@nuxtjs/composition-api'
import Vue from 'vue'
import { addRow, allRows } from '~/db/googleheets'

export default Vue.extend({
  name: 'Home',
  setup() {
    const who = ref<string>('');
    const whom = ref<string>('');
    const sum = ref<number>(0);
    const comment = ref<string>('');

    const people = ['Антон', 'Лера', 'Рома', 'Эльнур', 'Всем']

    const headings = ref<string[]>([])
    const result = ref<string[][]>([])

    async function addSpending() {
      if (!(who.value && whom.value && sum.value && comment.value)) {
        return;
      }

      await addRow({who: who.value, whom: whom.value, sum: sum.value, comment: comment.value});

      who.value = '';
      whom.value = '';
      sum.value = 0;
      comment.value = '';
    }

    useAsync(async () => {
      const data = await allRows();

      headings.value = data.values[0]
      data.values.splice(0, 1)
      result.value = data.values

      console.log(headings.value)
      console.log(result.value)
    })

    return {
      who,
      whom,
      sum,
      comment,
      addSpending,
      people,
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

}
.header {
  padding: 24px 40px 0;
  font-size: 40px;
  width: 100%;
  text-align: center;
}
.form {
  padding: 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 500px;
  width: 100%;
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
</style>
