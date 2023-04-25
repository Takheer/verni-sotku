<template>
  <form class='sign-in-form' @submit.prevent='addUser'>
    <h1 class='sign-in-form__title'>Вход</h1>
    <input v-model='email' type='email' placeholder='e-mail'>
    <input v-model='password' type='password' placeholder='Пароль'>
    <button type='submit' class='sign-in-form__add-button'>Войти</button>
    <p>
      Нет учётной записи? <NuxtLink to='/user/create-user' class='sign-in-form__link'>Зарегистрируйтесь!</NuxtLink>
    </p>
    <p v-if='errorMessage' class='sign-in-form__error-message'>{{ errorMessage }}</p>
  </form>
</template>

<script lang='ts'>
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import { createUser, signIn } from '~/db/firebaseAuth'

export default defineComponent({
  name: 'SignInForm',
  setup() {
    const { store } = useContext();
    const router = useRouter();
    const email = ref<string>('');
    const password = ref<string>('');
    const errorMessage = ref<string>('');

    async function addUser() {
      if (email.value === '') {
        errorMessage.value = 'E-mail не может быть пустым';
        return;
      }
      if (!email.value.includes('@')) {
        errorMessage.value = 'Неверный e-mail';
        return;
      }
      if (password.value === ''){
        errorMessage.value = 'Пароль не может быть пустым';
        return;
      }

      const res = await signIn(email.value, password.value);
      if (res.user) {
        store.commit('user/setUserId', res.user.uid)
        router.push("/")
        errorMessage.value = ''
      } else {
        errorMessage.value = res.errorMessage
      }
    }

    return {
      email,
      password,
      errorMessage,
      addUser,
    }
  }
})
</script>

<style lang='scss'>
.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 40%;

  &__title {
    text-align: center;
    font-size: 24px;
    font-weight: 200;
  }

  &__add-button {
    background-color: #3B666B;
    color: white;
    border-radius: 16px;
    padding: 12px 16px;
    margin-top: 8px;
  }

  &__error-message {
    margin: 0;
    color: #ff000099;
  }

  &__link {
    color: #11557C;
    transition: all 0.2s;

    &:hover {
      text-decoration: underline;
    }
  }
}
@media screen and (max-width: 500px) {
  .sign-in-form {
    width: 90%;
  }
}
@media screen and (max-width: 768px) {
  .sign-in-form {
    width: 70%;
  }
}
</style>
