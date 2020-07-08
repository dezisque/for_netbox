<template>
  <div>
    <div class="container">
      <newUser @updateData="addItem"></newUser>
      <span>
        Sort by:
        <select v-model="filterName">
          <option value="0">ID</option>
          <option value="1">Name</option>
          <option value="2">Age</option>
          <option value="3">Phone</option>
          <option value="4">Email</option>
        </select>
      </span>
      <div class="loader" v-if="loading">Loading...</div>
      <h2 v-else-if="data.length <= 0">Nothing here... :(</h2>
      <table v-else>
        <tr
          v-for="(item, index) in filterUsers"
          :key="index"
          class="table__row"
        >
          <td v-for="field of item" :key="field.field" class="table__item">
            {{ field.field }}:
            <input
              type="text"
              :disabled="!item.editable || field.field === 'ID'"
              v-model="field.value"
            />
          </td>
          <td @click="deleteItem(item[0].value)">Удалить</td>
          <td @click.prevent="editItem(item[0].value)">
            {{ !item.editable ? "Редактировать" : "Сохранить" }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import newUser from "@/components/newUser";
import { validation } from "@/Mixins/validation";
export default {
  name: "Js",
  components: {
    newUser,
  },
  mixins: [validation],
  data() {
    return {
      data: [],
      editable: false,
      loading: true,
      errors: [],
      filterName: "0",
    };
  },
  computed: {
    filterUsers: function () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.data.sort((a, b) =>
        String(a[+this.filterName].value).localeCompare(
          String(b[+this.filterName].value)
        )
      );
    },
  },
  created() {
    fetch("https://frontend-test.netbox.ru/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Response error");
      })
      .then((json) => {
        this.data = json;
        this.loading = false;
      })
      .catch((error) => {
        console.error(error)
      });
  },
  methods: {
    validateData(item) {
      this.errors = this.dataValidation(
        item.reduce((acc, it) => {
          acc[it.field.toLowerCase()] = it.value;
          return acc;
        }, {})
      );
      return this.errors.length ? false : true;
    },
    deleteItem(id) {
      fetch(`https://frontend-test.netbox.ru/?method=delete&id=${id}`, {
        method: "post",
        mode: "cors",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Response error");
        })
        .then(() => {
          this.data = this.data.filter((item) => item[0].value !== id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editItem(id) {
      const item = this.data.find((item) => item[0].value === id);
      if (item.editable === true) {
        if (this.validateData(item)) {
          fetch(
            `https://frontend-test.netbox.ru/?method=update&id=${item[0].value}&name=${item[1].value}&age=${item[2].value}&phone=${item[3].value}&email=${item[4].value}`,
            {
              method: "post",
              mode: "cors",
            }
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Response error");
            })
            .then(() => {
              console.log("Updated: ", this.data);
            })
            .catch((error) => {
              console.error(error);
            });
          this.$set(item, "editable", false);
        }
      } else {
        this.$set(item, "editable", true);
      }
    },
    addItem(inpData) {
      this.data.push(inpData);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
.table__item {
  padding: 10px;
}
tr {
  border-bottom: 1px solid black;
}
.loader {
  color: #000099;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
</style>
