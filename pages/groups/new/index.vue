<template>
  <div class='new-group'>
    <HeaderBar />
    <div v-if='uuid' class='new-group__content'>
      <form class='new-group__form' @submit.prevent='submit'>
        <h1 class='new-group__form__title'>Добавить новую группу</h1>
        <input v-model='name' type='text' placeholder='Название'>
        <button type='submit'>Создать</button>
      </form>
    </div>
    <div v-else class='new-group-error'>
      <p>Войдите или зарегистрируйтесь, чтобы создать себе новую группу для совместных трат</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { addGroup } from '~/db/groups'
import HeaderBar from '~/components/HeaderBar.vue'

export default defineComponent({
  name: 'NewGroup',
  components: { HeaderBar },
  setup() {
    const router = useRouter()

    const name = ref('')
    const uuid = process.server ? '' : localStorage.getItem('uid')

    async function submit() {
      if (!uuid) {
        console.log('user is not logged in');
        return;
      }

      await addGroup(name.value, uuid)
      router.push(`/user/${uuid}`)
    }

    return {
      name,
      uuid,
      submit,
    }
  }
})
</script>

<style lang='scss'>
.new-group {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 40%;

    &__title {
      text-align: center;
      font-size: 24px;
      font-weight: 200;
    }

    &--error, &--error:focus-visible {
      outline: red auto 1px;
    }
  }
}
</style>
