<template>
  <div>
    <h2>Add new user:</h2>
    <ul v-if="errors.length">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <form v-on:submit.prevent="addUser(newUser)">
      <label for="name">Name: </label>
      <input type="text" id="name" placeholder="name" v-model="newUser.name" />
      <label for="age">Age: </label>
      <input type="number" id="age" placeholder="age" v-model="newUser.age" />
      <label for="phone">Phone: </label>
      <input
        type="text"
        id="phone"
        placeholder="phone"
        v-model="newUser.phone"
      />
      <label for="email">Email: </label>
      <input
        type="text"
        id="email"
        placeholder="email"
        v-model="newUser['e-mail']"
      />
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "newUser",
  computed: {
    ...mapGetters({
      errors: "allErrors",
      newUser: "newUser",
    }),
  },
  methods: {
    ...mapMutations(["addUser"]),
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
div {
  padding-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin-bottom: 5px;
}
button {
  margin-top: 10px;
}
</style>
