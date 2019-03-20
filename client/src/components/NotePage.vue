<template>
  <section>
    <h1>Note Page</h1>
    <note :note="note"></note>
    <comments :comments="comments"></comments>
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
    }
  }
}
</script>

<style>

</style>
