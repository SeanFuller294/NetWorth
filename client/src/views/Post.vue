<template>
  <div class="Post container-fluid">
    <div class="row">
      <div class="col-3">
        <img :src="user.image" />
      </div>
      <div class="col">
        <h1>{{postProp.title}}</h1>
        <h3>{{postProp.author}}</h3>
        <p>{{postProp.body}}</p>
        <h5>{{postProp.likes}}|{{postProp.dislikes}}</h5>
      </div>
    </div>
    <comments />
    <button class="btn btn-success" @click="createCommentModal()">Create Comment</button>
  </div>
</template>

<script>
export default {
  name: "post",
  props: ["postProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    viewPost() {
      this.$router.push({
        name: "post",
        params: { postId: this.postProp._id }
      });
    }
  }
};
</script>

<style>
</style>
