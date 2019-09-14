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
          <li @click="showFollowers()">Followers</li>
          <li @click="showFollowing()">Following</li>
        </ul>
        <CreatePostModal />
        <button
          class="btn btn-success"
          data-toggle="modal"
          data-target="#create-post-modal"
        >Create Post</button>
      </div>
      <div class="col-10">
        <Posts v-for="post in posts" :postProp="post" :key="post._id" />
      </div>
    </div>
  </div>
</template>

<script>
import Posts from "../components/Posts";
import CreatePostModal from "../components/CreatePostModal";

export default {
  name: "Home",
  mounted() {
    this.$store.dispatch("getPosts", this.user._id);
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {},
  components: {
    Posts,
    CreatePostModal
  }
};
</script>

<style>
ul {
  text-align: left !important;
}
img {
  height: 200px;
}
</style>
