<template>
  <input
    class='calculator-input'
    type='text'
    :placeholder='placeholder'
    :value='rawValue'
    @input='calculateValue($event.target.value)'
  >
</template>

<script lang='ts'>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CalculatorInput',
  props: {
    placeholder: {
      type: String,
      default: '',
    }
  },
  setup(_, { emit }) {
    const rawValue = ref<string>('');

    function calculateValue(value: string) {
      rawValue.value = value
      const valid = value.split('').every((c: string) => '0123456789+-*/()'.includes(c))
      if (!valid) {
        emit('calculate-error', 'Используй *, /, +, - и (скобки) для операций')
        return;
      }
      try {
        // eslint-disable-next-line no-eval
        const calcValue = eval(value)
        emit('calculate', calcValue)
      } catch {
        emit('calculate-error', "¯\\_(ツ)_/¯")
      }
    }

    return {
      calculateValue,
      rawValue,
    }
  },
})
</script>
