<template>
  <div class="posts" @click="viewPost()">
    <h1>{{postProp.title}}</h1>
    <h1>{{postProp.author}}</h1>
    <p>{{postProp.body}}</p>
  </div>
</template>


<script>
export default {
  name: "posts",
  props: ["postProp"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getPosts");
  },
  computed: {
    post() {
      return this.$store.state.posts;
    }
  },
  methods: {
    viewPost() {
      this.$router.push({
        name: "post",
        params: { postId: this.postProp._id }
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>