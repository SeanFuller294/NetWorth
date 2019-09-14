<template>
  <div class="home conatainer-fluid">
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
          <li @click="createPost()">Create Post</li>
        </ul>
      </div>
      <div class="col-10">
        <Posts @click="viewPost()" />
      </div>
    </div>
  </div>
</template>

<script>
import Posts from "../components/Posts";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getActiveUser");
  },
  computed: {
    user() {
      return this.$store.state.requestedUser;
    }
  },
  methods: {}
};
</script>

<style>
ul {
  text-align: left !important;
}
</style>
