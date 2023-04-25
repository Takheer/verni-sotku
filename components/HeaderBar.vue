<template>
  <header class='header'>
    <NuxtLink to='/' class='header-left'>
      <img src='~/assets/favicon.png' alt='verni sotku icon' class='header-img'>
      <p class='header-title'>Верни сотку</p>
    </NuxtLink>
    <div class='header-right'>
      <NuxtLink class='header-link' to='/about'>
        О нас
      </NuxtLink>
      <NuxtLink v-if='uid' class='header-link'  :to='`user/${uid}`'>
        😎
      </NuxtLink>
      <NuxtLink v-else class='header-link' to='/user/sign-in'>
        Ауф 🐺
      </NuxtLink>
    </div>
  </header>
</template>

<script lang='ts'>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HeaderBar',
  setup() {
    const { store } = useContext();
    const uid = ref<string>();
    if (process.client) {
      uid.value = store.getters?.['user/getUserId'] || localStorage?.getItem('uid')
    }

    return {
      uid
    }
  }
})
</script>

<style lang='scss'>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #555555;
  padding: 16px;

  &-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }

  &-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    padding-right: 32px;
  }

  &-link {
    font-size: 24px;
    font-weight: 200;
    transition: all 0.2s;

    &::after {
      content: '';
      width: 0;
      height: 2px;
      display: block;
      background: #3B666B;
      transition: 300ms;
    }

    &:hover::after {
      width: 100%;
    }
  }

  &-img {
    height: 64px;
    width: 64px;
  }

  &-title {
    font-size: 40px;
    font-weight: 200;
  }
}
@media screen and (max-width: 500px) {
  .header {
    &-left {
      gap: 16px
    }
    &-right {
      gap: 8px;
    }
    &-img {
      height: 32px;
      width: 32px;
    }
    &-title {
      font-size: 16px;
    }
    &-link {
      font-size: 16px;
    }
  }
}
</style>
