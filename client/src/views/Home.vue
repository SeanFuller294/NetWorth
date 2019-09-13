<template>
  <div class="home conatainer-fluid">
    <div class="row">
      <div class="col-3">
        <img :src="user.image" />
      </div>
      <div class="col-6">
        <netWorth />
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
      <div class="col-1">
        <ul>
          <li @click="showFollowers()">Followers</li>
          <li @click="showFollowing()">Following</li>
          <li @click="createPost()">Create Post</li>
        </ul>
      </div>
      <div class="col-11">
        <posts @click="viewPost()" />
      </div>
    </div>
  </div>
</template>

<script>
import Post from "./Post";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style>
</style>
