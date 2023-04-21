<template>
  <div>
    <Header />
    <div class='about'>
      <h1 class='title'>Верни Сотку — Приложение для контроля общих долгов</h1>
      <div class='img-text'>
        <img src='~/assets/favicon.png' alt='picture' class='image'>
        <p class='lead'>
          Купил друзьям пива, а они забыли вернуть? Или тебе не хотят покупать пиво, потому что боятся, что не вернёшь?
          Тогда это приложение для тебя! Создай группу, отправь приглашения и начни вести общий баланс вместе с друзьями и коллегами!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import Header from '~/components/Header.vue'

export default defineComponent({
  name: 'About',
  components: { Header },
})
</script>

<style scoped lang='scss'>
.about {
  padding: 32px;
}

.title {
  padding: 24px 40px 0;
  font-size: 40px;
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
}
.img-text {
  margin-top: 64px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  gap: 32px;
}
.lead {
  font-size: 32px;
  line-height: 1.4;
  font-weight: 300;
}
.image {
  height: 520px;
}
</style>
