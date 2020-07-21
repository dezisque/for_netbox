import Vue from "vue";
import validation from "@/Mixins/validation";
export default {
  actions: {
    async fetchUsers(ctx) {
      let res = await fetch("https://frontend-test.netbox.ru/");
      let users = await res.json();
      ctx.commit("updateUsers", users);
    },
  },
  mutations: {
    updateUsers(state, users) {
      state.data = users;
    },
    deleteUser(state, id) {
      state.data = state.data.filter((item) => item[0].value !== id);
    },
    editUser(state, id) {
      const item = state.data.find((item) => item[0].value === id);
      if (item.editable === true) {
        state.errors = validation(
          item.reduce((acc, it) => {
            acc[it.field.toLowerCase()] = it.value;
            return acc;
          }, {})
        );
        if (state.errors.length === 0) {
          Vue.set(item, "editable", false);
          console.log("updated");
        }
      } else {
        Vue.set(item, "editable", true);
      }
    },
    addUser(state, newUser) {
      state.errors = validation(newUser);
      if (state.errors.length === 0) {
        state.data.push([
          { field: "ID", type: "integer", value: new Date().valueOf() },
          { field: "Name", type: "string", value: newUser.name },
          { field: "Age", type: "integer", value: newUser.age },
          { field: "Phone", type: "string", value: newUser.phone },
          { field: "E-mail", type: "string", value: newUser["e-mail"] },
        ]);
        state.newUser = [];
      }
    },
  },
  state: {
    data: [],
    errors: [],
    newUser: [],
  },
  getters: {
    allUsers(state) {
      return state.data;
    },
    allErrors(state) {
      return state.errors;
    },
    newUser(state) {
      return state.newUser;
    },
  },
};
