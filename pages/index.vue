<template>
  <div class='main'>
    <h1 class='header'>Добавить трату</h1>
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
    <div class='spending-list'>
      <div v-for='spending of spendingList' :key='spending.who.id' class='spending-item'>
        <div class='spending-item-header'>
          <div class='person-label' :style='{ color: spending.who.textColor, backgroundColor: spending.who.bgColor }'>
            {{ spending.who.name }}
          </div>
          ⇥
          <div class='person-label' :style='{ color: spending.whom.textColor, backgroundColor: spending.whom.bgColor }'>
            {{ spending.whom.name }}
          </div>
        </div>
        <div class='spending-item-body'>
          <div>{{ spending.sum }}</div>
          —
          <div>{{ spending.comment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, useFetch } from '@nuxtjs/composition-api'
import Vue from 'vue'
import { addRow, allRows } from '~/db/googleheets'

export default Vue.extend({
  name: 'Home',
  setup() {
    const who = ref<string>('');
    const whom = ref<string>('');
    const sum = ref<number>(0);
    const comment = ref<string>('');

    const peopleWho = [
      {
        id: 1,
        name: 'Антон',
        bgColor: '#FFCDD2',
        textColor: '#F44336',
      },
      {
        id: 2,
        name: 'Лера',
        bgColor: '#F8BBD0',
        textColor: '#E91E63',
      },
      {
        id: 3,
        name: 'Рома',
        bgColor: '#E1BEE7',
        textColor: '#9C27B0',
      },
      {
        id: 4,
        name: 'Эльнур',
        bgColor: '#D1C4E9',
        textColor: '#673AB7',
      },
    ]

    const peopleWhom = [
      ...peopleWho,
      {
        id: 5,
        name: 'Всем',
        bgColor: '#CFD8DC',
        textColor: '#607D8B',
      }
    ]

    const headings = ref<string[]>([])
    const spendingList = ref<any[]>([])

    async function addSpending() {
      if (!(who.value && whom.value && sum.value && comment.value)) {
        return;
      }

      await addRow({who: who.value, whom: whom.value, sum: sum.value, comment: comment.value});

      spendingList.value.unshift({
        who: peopleWho.find(p => p.name === who.value),
        whom: peopleWhom.find(p => p.name === whom.value),
        sum: sum.value,
        comment: comment.value
      })

      who.value = '';
      whom.value = '';
      sum.value = 0;
      comment.value = '';
    }

    useFetch(async () => {
      const data = await allRows();

      headings.value = data.values[0]
      data.values.splice(0, 1)
      spendingList.value = data.values.reverse().map((row, i) => ({
        who: peopleWho.find(p => p.name === row[0]) || {
          id: i,
          name: row[0],
          bgColor: '#CFD8DC',
          textColor: '#607D8B',
        },
        whom: peopleWhom.find(p => p.name === row[1]) || {
          id: i,
          name: row[1],
          bgColor: '#CFD8DC',
          textColor: '#607D8B',
        },
        sum: row[2],
        comment: row[3]
      }))

      // console.log(spendingList.value)
    })

    return {
      who,
      whom,
      sum,
      comment,
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

.spending-list {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  overflow: auto;
  white-space: nowrap;
  padding: 32px 24px;
}

.spending-item {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  border: 1px solid #3B666B;
  padding: 8px;
  border-radius: 8px;
}

.spending-item-header {
  display: flex;
  flex-direction: row;
}

.spending-item-body {
  display: flex;
  flex-direction: row;
  padding: 8px;
  gap: 8px;
}

.person-label {
  padding: 4px 8px;
  border-radius: 16px;
  margin-left: 4px;
  margin-right: 4px;
  font-size: 12px;
  font-weight: 300;
}

@media screen and (max-width: 500px) {
  .content {
    flex-direction: column;
  }
  .form {
    width: 100%;
  }
  .spending-list {
    width: 100%;
  }
}
</style>
