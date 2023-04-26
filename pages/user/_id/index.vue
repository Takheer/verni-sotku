<template>
  <div class='index'>
    <p>Тут будут данные о пользователе с айди {{ id }}</p>
    <button @click='signOutUser'>Выйти</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UserPersonalPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { store } = useContext();
    const id = route.value.params.id

    async function signOutUser() {
      await store.dispatch('user/signOut');
      router.push('/')
    }

    return {
      id,
      signOutUser,
    }
  }
})
</script>

<style lang='scss'>
</style>
