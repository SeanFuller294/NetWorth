<template>
  <div id="create-post-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create A Post!</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createPost()">
            <div class="form-group">
              <label for="title">Title</label>

              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter a title"
                v-model="newPost.title"
                required
              />
            </div>

            <div class="form-group">
              <label for="body">Body</label>

              <input
                type="text"
                class="form-control"
                id="body"
                placeholder="Enter a clever post"
                v-model="newPost.body"
              />
            </div>

            <button type="submit" class="btn btn-primary">Submit Post</button>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import user from this.$store.state.user
export default {
  name: "create-post-modal",
  data() {
    return {
      newPost: {}
    };
  },
  computed: {},
  methods: {
    createPost() {
      newPost.author = user.id
      this.$store.dispatch("createPost", this.newPost);
      this.newPost = {};
    }
  },
  components: {}
};
</script>


<style scoped>
</style>