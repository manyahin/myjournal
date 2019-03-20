<template>
  <section class="comments">
    <ul>
      <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
      <li>Comments</li>
      <li>Comments 2</li>
      <li>Comments 3</li>
      <li>Comments 4</li>
    </ul>
    <textarea v-model="newComment" name="" id="" cols="30" rows="10"></textarea>
    <button @click="addComment">Send</button>
  </section>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array
    }
  },
  data () {
    return {
      newComment: ''
    }
  },
  methods: {
    addComment () {
      this.$emit('onComment', this.newComment)
    }
  }
}
</script>
