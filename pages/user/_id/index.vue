<template>
  <div class='user-page'>
    <HeaderBar />
    <div class='user-page__content'>
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
      <h2>Группы совместных трат</h2>
      <ul v-if='user.groups' class='user-page__groups'>
        <li v-for='group of user.groups' :key='group.id'>
          <NuxtLink :to='`/groups/${group.slug}`' class='user-page__group-item'>{{ group.name }}</NuxtLink>
        </li>
      </ul>
      <div class='user-page__btn-row'>

        <NuxtLink to='/groups/new' class='user-page__btn-add'>+ Добавить группу</NuxtLink>
        <button @click='signOutUser'>Выйти</button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, useAsync, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { getUserByUUID } from '~/db/users'
import HeaderBar from '~/components/HeaderBar.vue'

export default defineComponent({
  name: 'UserPage',
  components: { HeaderBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { store } = useContext();
    const id = route.value.params.id
    const user = ref({});

    async function signOutUser() {
      await store.dispatch('user/signOut');
      router.push('/')
    }

    useAsync(async () => {
      user.value = await getUserByUUID(id)
    })

    return {
      id,
      signOutUser,
      user
    }
  }
})
</script>

<style lang='scss'>
.user-page {
  &__content {
    padding: 16px;
  }

  &__btn-add {
    padding: 8px 12px;
    background-color: #3B666B;
    color: #fff;
    border-radius: 12px;
  }

  &__btn-row {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 32px;
  }

  &__groups {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
  }

  &__group-item {
    display: flex;
    flex-direction: row;
    padding: 12px 16px;
    background-color: #11557Cdd;
    border: 1px solid #11557C;
    color: #ffffff;
  }
}
</style>
