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
    <input v-model='sum' placeholder='Сумма'>
    <input v-model='comment' placeholder='Комментарий'>
    <button class='add-button' type='submit'>Добавить</button>
  </form>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AddSpendingForm',
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
    const sum = ref<number>(0);
    const comment = ref<string>('');

    function addSpending() {
      if (!(who.value && whom.value && sum.value && comment.value)) {
        return;
      }

      emit('add-spending', { who: who.value, whom: whom.value, sum: sum.value, comment: comment.value })

      who.value = '';
      whom.value = '';
      sum.value = 0;
      comment.value = '';
    }

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

@media screen and (max-width: 500px) {
  .form {
    width: 100%;
  }
}
</style>
