<template>
  <div>
    <h2>Add new user:</h2>
    <ul v-if="errors.length">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <form v-on:submit.prevent="validateData">
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
import { validation } from "@/Mixins/validation";
export default {
  name: "newUser",
  mixins: [validation],
  data() {
    return {
      newUser: {
        id: null,
        name: null,
        age: null,
        phone: null,
        "e-mail": null,
      },
      errors: [],
    };
  },
  methods: {
    validateData() {
      this.errors = this.dataValidation(this.newUser);
      this.errors.length ? "" : this.sendData();
    },
    sendData() {
      const newUser = this.newUser;
      fetch(
        `https://frontend-test.netbox.ru/?method=add&name=${newUser.name}&age=${newUser.age}&phone=${newUser.phone}&email=${newUser["e-mail"]}`
      )
        .then((response) => {
          if (response.ok) {
            this.$emit("updateData", [
              { field: "ID", type: "integer", value: new Date().valueOf() },
              { field: "Name", type: "string", value: newUser.name },
              { field: "Age", type: "integer", value: newUser.age },
              { field: "Phone", type: "string", value: newUser.phone },
              { field: "Email", type: "string", value: newUser["e-mail"] },
            ]);
            this.newUser = {};
            return response.json();
          }
          throw new Error("Response error");
        })
        .catch((e) => console.log(e));
    },
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
