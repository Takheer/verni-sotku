<template>
  <div class='group-page'>
    <HeaderBar />
    <div class='group-page__content' v-if='userId'>
      <h1 class='group-page__title'>
        {{ group.name }}
        <small v-if='group.creator'>от {{ group.creator.name || group.creator.email }}</small>
      </h1>
      <div class='group-page__users-and-spendings'>
        <div class='group-page__spendings'>
          <h2 class='group-page__subtitle'>Траты</h2>
          <ul v-if='group.spendings'>
            <li v-for='spending of group.spendings' :key='spending.id'>
              {{ spending }}
            </li>
          </ul>
        </div>
        <div class='group-page__users'>
          <h2 class='group-page__subtitle'>Люди</h2>
          <ul v-if='group.users'>
            <li v-for='user of group.users' :key='user.id'>
              {{ user.name || user.email }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Войдите или зарегистрируйтесь, чтобы посмотреть содержимое этой группы</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, useAsync, useRoute } from '@nuxtjs/composition-api'
import HeaderBar from '~/components/HeaderBar.vue'
import { getGroupBySlug } from '~/db/groups'

export default defineComponent({
  name: 'GroupPage',
  components: { HeaderBar },
  setup() {
    const route = useRoute();
    const userId = process.server ? '' : localStorage.getItem('uid');
    const slug = route.value.params.slug

    const group = ref({})

    useAsync(async () => {
      group.value = await getGroupBySlug(slug)
    })

    return {
      group,
      userId
    }
  }
})
</script>

<style lang='scss'>
.group-page {
  &__content {
    padding: 16px;
  }

  &__title {
    font-weight: 600;
    font-size: 24px;

    & > small {
      font-size: 18px;
      font-weight: 300;
      margin-left: 8px;
    }
  }

  &__subtitle {
    font-size: 18px;
    font-weight: 600;
  }

  &__users-and-spendings {
    display: flex;
    flex-direction: row;
    gap: 32px;
  }
}
</style>
