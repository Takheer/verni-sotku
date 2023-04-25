import { ActionTree, GetterTree, MutationTree } from 'vuex'

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

export const actions: ActionTree<UserState, UserState> = {}
