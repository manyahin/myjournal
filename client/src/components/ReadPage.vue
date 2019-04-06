<template>
  <div>
    <router-link class="pure-button link-to-calendar" to="/calendar">Open Calendar</router-link>
    <div class="filters pure-g">
      <div class="pure-u-1 pure-u-sm-1-2">
        Filters:
        <button @click="readAllNotes">All notes</button>
        <button @click="readStarredNotes">Only starred notes</button>
      </div>
      <div class="pure-u-1 pure-u-sm-1-2 search-form">
        <search @onSubmit="readBySearch"></search>
      </div>
    </div>
    <notes-list :notes="notes" :loading="loading"></notes-list>
    <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-notes">All notes loaded</div>
      <div slot="no-results"></div>
      <div slot="spinner">
        <loading :status="true"></loading>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import axios from 'axios'
import InfiniteLoading from 'vue-infinite-loading'

import NotesList from '@/components/NotesList'
import Loading from '@/components/Loading'
import Search from '@/components/Search'

const NOTES_PER_PAGE = 50

export default {
  components: {
    NotesList,
    Loading,
    Search,
    InfiniteLoading
  },
  data () {
    return {
      notes: [],
      page: 0,
      loading: true,
      view: 'all',
      searchText: '',
      infiniteId: +new Date()
    }
  },
  methods: {
    async loadNotes (filter = {}) {
      const { data } = await axios.get(`Notes?filter=${JSON.stringify(filter)}`)
      return data
    },
    async readAllNotes () {
      this.view = 'all'
      this.infiniteId += 1
      this.beforeLoad()
    },
    async readStarredNotes () {
      this.view = 'star'
      this.infiniteId += 1
      this.beforeLoad()
    },
    async readBySearch (text) {
      this.view = 'search'
      this.searchText = text
      this.infiniteId += 1
      this.beforeLoad()
    },
    async infiniteHandler ($state) {
      const notes = []
      switch (this.view) {
        case 'all':
          notes.push(...await this.loadNotes({
            order: 'created_at ASC',
            skip: NOTES_PER_PAGE * this.page,
            limit: NOTES_PER_PAGE
          }))
          break
        case 'star':
          notes.push(...await this.loadNotes({
            where: {
              favorite: true
            },
            order: 'created_at ASC',
            skip: NOTES_PER_PAGE * this.page,
            limit: NOTES_PER_PAGE
          }))
          break
        case 'search':
          notes.push(...await this.loadNotes({
            where: {
              '$text': {
                search: this.searchText
              }
            },
            order: 'created_at ASC',
            skip: NOTES_PER_PAGE * this.page,
            limit: NOTES_PER_PAGE
          }))
          break
      }
      if (notes.length) {
        this.notes.push(...notes)
        this.page += 1
        $state.loaded()
      } else {
        $state.complete()
      }
      this.afterLoad()
    },
    beforeLoad () {
      this.notes = []
      this.page = 0
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

.no-more-notes {
  margin-bottom: 25px;
  color: grey;
  font-style: italic;
}

.search-form {
  text-align: right;
}

@media screen and (max-width: 35.5em) {
  .search-form {
    margin-top: 8px;
    text-align: left;
  }
}
</style>
