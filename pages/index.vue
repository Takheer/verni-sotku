<template>
  <div>
    <h1>Форма для отправки</h1>
    <form class='form' @submit.prevent='addSpending'>
      <input v-model='who' placeholder='Кто купил'>
      <input v-model='whom' placeholder='Кому купил'>
      <input v-model='sum' placeholder='Сумма'>
      <input v-model='comment' placeholder='Комментарий'>
      <button type='submit'>Добавить</button>
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
    }
  }
})
</script>

<style>
.form {

}
</style>
