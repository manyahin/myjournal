<template>
  <section class="comments">
    <ul>
      <li v-for="(comment, index) in comments" :key="index">
        <span class="time">{{ comment.created_at | moment("MMM Do YYYY, HH:mm") }}</span>
        <span class="body">{{ comment.body }}</span>
      </li>
    </ul>
    <form class="pure-form" @submit.prevent="addComment">
      <textarea v-model="newComment" autofocus="true"
        required placeholder="What comment?"
        @keydown.enter="handleCmdEnter($event)"
      ></textarea>
      <button class="pure-button" type="submit">Send</button>
    </form>
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
      if (!this.newComment) return

      this.$emit('onComment', {
        body: this.newComment,
        created_at: new Date()
      })

      this.newComment = ''
    },
    handleCmdEnter ({ctrlKey, metaKey}) {
      if (ctrlKey || metaKey) {
        this.addComment()
      }
    },
  }
}
</script>

<style lang="scss">
.comments {
  .time {
    font-size: 12px;
  }
  .body {
    white-space: pre-line;
  }
  li {
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    height: 100px;
    border: 1px solid #0F595B;
    border-radius: 4px;
    display: block;
    caret-color: grey;
    padding: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /* Hack: autofocus attr cause red border since page loaded,
     disable it for textarea */
  textarea:required:invalid {
    border: 1px solid #1A2943 !important;
    color: white !important;
  }
  button[type="submit"] {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 4px;
    background-color: #0F595B;
    border: 1px solid #1A2943;
    color: white;
    padding: 4px 6px;
    font-size: 20px;
    font-weight: 200;
  }
}
</style>
