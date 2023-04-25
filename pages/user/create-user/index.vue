<template>
  <div class='create-user-page'>
    <HeaderBar />
    <div class='create-user-page__content'>
      <NewUserForm/>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import NewUserForm from '~/components/NewUserForm.vue'
import HeaderBar from '~/components/HeaderBar.vue'

export default defineComponent({
  name: 'CreateUser',
  components: { HeaderBar, NewUserForm }
})
</script>

<style lang='scss'>
.create-user-page {
  min-height: 90vh;

  &__content {
    width: 100%;
    padding-top: 64px;
    padding-bottom: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
