<template>
  <form class='new-user-form' @submit.prevent='addUser'>
    <h1 class='new-user-form__title'>Регистрация</h1>
    <input v-model='email' type='email' placeholder='e-mail'>
    <input v-model='password' type='password' placeholder='Пароль'>
    <input v-model='passwordAgain' type='password' placeholder='Повторите пароль'>
    <button type='submit' class='new-user-form__add-button'>Зарегистрироваться</button>
    <p v-if='errorMessage' class='new-user-form__error-message'>{{ errorMessage }}</p>
    <p>
      Уже зарегистрированы? <NuxtLink to='/user/sign-in' class='new-user-form__link'>Войдите!</NuxtLink>
    </p>
  </form>
</template>

<script lang='ts'>
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NewUserForm',
  setup() {
    const router = useRouter();
    const { store } = useContext();
    const email = ref<string>('');
    const password = ref<string>('');
    const passwordAgain = ref<string>('');
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
      if (password.value !== passwordAgain.value) {
        errorMessage.value = 'Пароли не совпадают';
        return;
      }

      const res = await store.dispatch('user/createUser', { email: email.value, password: password.value });
      if (res.user) {
        router.push("/")
        errorMessage.value = ''
      } else {
        errorMessage.value = res.errorMessage
      }
    }

    return {
      email,
      password,
      passwordAgain,
      errorMessage,
      addUser,
    }
  }
})
</script>

<style lang='scss'>
.new-user-form {
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
  .new-user-form {
    width: 90%;
  }
}
@media screen and (max-width: 768px) {
  .new-user-form {
    width: 70%;
  }
}
</style>
