<template>
  <notes-list :notes="notes"></notes-list>
</template>

<script>
import axios from 'axios'
import NotesList from '@/components/NotesList'

export default {
  components: {
    NotesList
  },
  data () {
    return {
      notes: []
    }
  },
  async created () {
    let { data } = await axios.get('Notes?filter={"order": "created_at ASC"}')
    this.notes = data
  }
}
</script>
