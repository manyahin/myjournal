<template>
  <notes-list :notes="notes"></notes-list>
</template>

<script>
import axios from 'axios'
import NotesList from '@/components/NotesList'
import auth from '@/utils/auth'

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
    let { data } = await axios.get('Notes?filter={"order": "created_at ASC"}', {
      headers: {'Authorization': auth.getToken()}
    })
    this.notes = data
  }
}
</script>
