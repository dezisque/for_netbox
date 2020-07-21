import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import HtmlCss from "@/views/HtmlCss";
import Js from "@/views/Js";
import store from "./store";

const routes = [
  { path: "/html", component: HtmlCss },
  { path: "/js", component: Js },
];

Vue.use(VueRouter);

Vue.config.productionTip = false;
const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
