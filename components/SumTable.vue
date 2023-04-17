<template>
  <table class='table'>
    <tr>
      <th></th>
      <th colspan='4'>Кому купил</th>
    </tr>
    <tr>
      <th>Кто купил</th>
      <th v-for='personWhom of people' :key='personWhom.id'>{{ personWhom.name }}</th>
    </tr>
    <tr v-for='personWho of people' :key='personWho.id'>
      <td>{{personWho.name}}</td>
      <td></td>
    </tr>
  </table>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SumTable',
  props: {
    table: {
      type: Array as PropType<any[][]>,
      required: true
    },
    people: {
      type: Array as PropType<any[]>,
      required: true,
    }
  }
})
</script>
