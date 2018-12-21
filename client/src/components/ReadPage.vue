<template>
  <div>
    <div class="filters pure-g">
      <div class="pure-u-1-1">
        Filters:
        <button @click="loadAllNotes">All notes</button>
        <button @click="loadOnlyStarredNotes">Only starred notes</button>
      </div>
    </div>
    <p v-show="loading"><img src="static/ajax-loader.gif" alt="Loading..."></p>
    <notes-list :notes="notes"></notes-list>
  </div>
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
      notes: [],
      loading: false
    }
  },
  async created () {
    await this.loadAllNotes()
  },
  methods: {
    async loadOnlyStarredNotes () {
      this.beforeLoad()
      let filter = {
        where: {
          favorite: true
        },
        order: 'created_at DESC'
      }
      let { data } = await axios.get('Notes?filter=' + JSON.stringify(filter))
      this.notes = data
      this.afterLoad()
    },
    async loadAllNotes () {
      this.beforeLoad()
      let { data } = await axios.get('Notes?filter={"order": "created_at ASC"}')
      this.notes = data
      this.afterLoad()
    },
    beforeLoad () {
      this.notes = []
      this.loading = true
    },
    afterLoad () {
      this.loading = false
    }
  }
}
</script>

<style>
.filters {
  margin-top: 10px;
}
</style>
