<template>
  <div>
    <router-link class="pure-button link-to-calendar" to="/calendar">Open Calendar</router-link>
    <div class="filters pure-g">
      <div class="pure-u-1 pure-u-sm-1-2">
        Filters:
        <button @click="loadAllNotes">All notes</button>
        <button @click="loadOnlyStarredNotes">Only starred notes</button>
      </div>
      <div class="pure-u-1 pure-u-sm-1-2">
        <search @onSubmit="loadBySearch"></search>
      </div>
    </div>
    <loading :status="loading"></loading>
    <notes-list :notes="notes" :loading="loading"></notes-list>
  </div>
</template>

<script>
import axios from 'axios'
import NotesList from '@/components/NotesList'
import Loading from '@/components/Loading'
import Search from '@/components/Search'

export default {
  components: {
    NotesList,
    Loading,
    Search
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
    async loadBySearch (text) {
      this.beforeLoad()
      let filter = {
        where: {
          '$text': {
            search: text
          }
        }
      }
      let { data } = await axios.get('Notes?filter=' + JSON.stringify(filter))
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

.link-to-calendar {
  margin-top: 10px;
}
</style>
