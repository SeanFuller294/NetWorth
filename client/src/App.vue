<template>
  <div id="app">
    <router-link to="/home">Home</router-link>|
    <button class="btn btn-danger" @click="logout()">Logout</button> |
    <div class="input-group mb-3">
      <input id="search-bar" type="email" class="form-control" placeholder="example.abc.com" />
      <button class="input-group-text" id="Search" @click="search()">Search</button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    search() {
      this.$store.findUsersByEmail();
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>