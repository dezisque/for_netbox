export default {
  actions: {
    async fetchUsers(ctx){
      let res = await fetch("https://frontend-test.netbox.ru/")
      let users = await res.json()
      ctx.commit('updateUsers', users)
    },
  },
  mutations: {
    updateUsers(state, users){
      state.data = users
    },
    deleteUser(state, id){
      state.data = state.data.filter((item) => item[0].value !== id);
    }
  },
  state: {
    data: [],
  },
  getters: {
    allUsers(state){
      return state.data
    },
  }
}