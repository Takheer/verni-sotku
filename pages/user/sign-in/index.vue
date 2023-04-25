<template>
  <div class='sign-in-page'>
    <HeaderBar />
    <div class='create-user-page__content'>
      <SignInForm/>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import HeaderBar from '~/components/HeaderBar.vue'
import SignInForm from '~/components/SignInForm.vue'

export default defineComponent({
  name: 'SignInPage',
  components: { SignInForm, HeaderBar }
})
</script>

<style lang='scss'>
.sign-in-page {
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
