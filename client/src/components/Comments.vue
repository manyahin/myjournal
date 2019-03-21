<template>
  <section class="comments">
    <ul>
      <li v-for="(comment, index) in comments" :key="index">
        <span>{{ comment.created_at | moment("dddd, MMM Do YY, HH:mm") }}</span>
        <p>{{ comment.body }}</p>
      </li>
      <li>Test comment</li>
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
      this.$emit('onComment', {
        body: this.newComment,
        created_at: new Date()
      })

      this.newComment = ''
    }
  }
}
</script>
