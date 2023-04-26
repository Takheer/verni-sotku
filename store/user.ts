import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { registerNewUser, signIn } from '~/db/firebaseAuth'

export const state = () => ({
  userId: '',

})

export type UserState = ReturnType<typeof state>

export const getters:GetterTree<UserState, UserState> = {
  getUserId(state: UserState) {
    return state.userId;
  }
}

export const mutations: MutationTree<UserState> = {
  setUserId(state: UserState, userId: string) {
    state.userId = userId;
  }
}

export const actions: ActionTree<UserState, UserState> = {
  async createUser({ commit }, { email, password}) {
    const res = await registerNewUser(email, password);

    if (res.user) {
      localStorage.setItem('uid', res.user.uid);
      commit('setUserId', res.user.uid)
      return { user: res.user }
    } else {
      return res;
    }
  },
  async signInUser({ commit }, {email, password}) {
    const res = await signIn(email, password);

    if (res.user) {
      localStorage.setItem('uid', res.user.uid);
      commit('setUserId', res.user.uid)
      return { user: res.user }
    } else {
      return res;
    }
  },
  signOut({ commit }) {
    localStorage.removeItem('uid');
    commit('setUserId', '')
  }
}
