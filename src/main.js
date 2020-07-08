import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import HtmlCss from "@/views/HtmlCss";
import Js from "@/views/Js";

const routes = [
  { path: "/html", component: HtmlCss },
  { path: "/js", component: Js },
];

Vue.use(VueRouter);

Vue.config.productionTip = false;
const router = new VueRouter({
  routes, // сокращённая запись для `routes: routes`
  mode: "history",
});

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
