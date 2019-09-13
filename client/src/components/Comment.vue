<template>
  <div class="comment row">
    <button class="btn btn-danger float-right" @click="deleteComment()">x</button>
    <h1>{{user.author}}</h1>
    <p>{{user.body}}</p>
  </div>
</template>


<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteComment() {}
  },
  components: {}
};
</script>


<style scoped>
</style>