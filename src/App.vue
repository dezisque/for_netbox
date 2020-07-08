<template>
  <div id="app">
    <nav class="nav">
      <h2>
        Website created by
        <a href="https://github.com/dezisque">Dezisque</a> for Netbox
      </h2>
      <router-link class="nav__link" to="/html">Html</router-link>
      <router-link class="nav__link" to="/js">Js</router-link>
    </nav>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
nav {
  margin: 0 auto;
  text-align: center;
}
.nav__link {
  font-size: 1.2em;
  padding: 0 20px;
}
</style>
