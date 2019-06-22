<template>
  <section>
    <h2>Note Page</h2>
    <note :note="note" :options="{fullDate: true, showLink: false}"></note>
    <comments :comments="comments" @onComment="addComment"></comments>
  </section>
</template>

<script>
import axios from 'axios'

import Note from '@/components/Note'
import Comments from '@/components/Comments'

import LoadingMixin from '@/mixins/loading'

export default {
  components: {
    Note,
    Comments
  },
  mixins: [
    LoadingMixin
  ],
  data () {
    return {
      noteId: this.$route.params.id,
      note: {},
      comments: []
    }
  },
  created () {
    this.getNote()
  },
  methods: {
    async getNote () {
      this.beforeLoad()

      let { data } = await axios.get(`Notes/${this.noteId}`)
      this.note = data
      this.comments = data.comments || []

      this.afterLoad()
    },
    async addComment (comment) {
      this.comments.push(comment)

      try {
        let { data: note } = await axios.patch(`Notes/${this.noteId}`, {
          comments: this.comments
        })

        this.comments = note.comments
        // succefful notification
      }
      catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
</style>
