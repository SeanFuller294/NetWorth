<template>
  <div class="home conatainer-fluid">
    <router-link to="/home">Home</router-link>|
    <button class="btn btn-danger" @click="logout()">Logout</button> |
    <div class="input-group mb-3">
      <form @submit.prevent="search">
        <input
          id="search-bar"
          type="email"
          v-model="email"
          class="form-control"
          placeholder="example.abc.com"
        />
        <button class="input-group-text" id="Search" type="submit">Search</button>
      </form>
    </div>
    <div class="row">
      <div class="col-3">
        <img :src="user.image || 'http://placehold.it/200x200'" />
      </div>
      <div class="col-6 border">
        <h1>{{user.netWorth}}</h1>
      </div>
      <div class="col-3" id="bio">
        <h5>{{user.name}}</h5>
        <h5>{{user.email}}</h5>
        <h5>{{user.location}}</h5>
        <h5>{{user.work}}</h5>
        <h5>{{user.phone}}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <ul>
          <li @click="follow()">Follow</li>
          <li @click="Unfollow()">Unfollow</li>
        </ul>
      </div>
      <div class="col-10">
        <Posts v-for="post in posts" :postProp="post" :key="post._id" />
      </div>
    </div>
  </div>
</template>

<script>
import Posts from "../components/Posts";

export default {
  name: "Profile",
  props: ["id"],
  data() {
    return {
      email: ""
    };
  },
  mounted() {
    this.$store.dispatch("getPosts", this.id);
    this.$store.dispatch("findUserById", this.id);
  },
  computed: {
    user() {
      return this.$store.state.requestedUser;
    },
    posts() {
      return this.$store.state.posts;
    }
  },
  watch: {
    id: {
      handler(val) {
        this.$store.dispatch("getPosts", val);
      },
      deep: true
    }
  },
  methods: {
    search() {
      this.$store.dispatch("findUsersByEmail", this.email);
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  components: {
    Posts
  }
};
</script>

<style>
ul {
  text-align: left !important;
}
</style>
