<template>
  <div>
    <router-link class="button link-to-calendar" to="/calendar"
      >Open Calendar</router-link
    >
    <div class="columns filters">
      <div class="column">
        Filters:
        <b-button class="is-small" @click="readAllNotes">All notes</b-button>
        <b-button class="is-small" @click="readStarredNotes"
          >Only starred notes</b-button
        >
      </div>
      <div class="column search-form">
        <form id="submit" @submit.prevent="readBySearch">
          <b-field position="is-right">
            <b-input
              size="is-small"
              required
              native-type="text"
              placeholder="text to search"
              v-model="searchText"
            />
            <p class="control">
              <b-button class="is-small" native-type="submit">Search</b-button>
            </p>
          </b-field>
        </form>
      </div>
    </div>
    <infinite-notes-list
      order="asc"
      :key="infiniteId"
      :filter="filter"
    ></infinite-notes-list>
  </div>
</template>

<script>
import InfiniteNotesList from '@/components/InfiniteNotesList'

export default {
  components: {
    InfiniteNotesList
  },
  data() {
    return {
      filter: {},
      searchText: '',
      infiniteId: +new Date()
    }
  },
  methods: {
    readAllNotes() {
      this.filter = {}
      this.infiniteId += 1
    },
    readStarredNotes() {
      this.filter = {
        where: {
          favorite: true
        }
      }
      this.infiniteId += 1
    },
    readBySearch() {
      this.filter = {
        where: {
          $text: {
            search: this.searchText
          }
        }
      }
      this.infiniteId += 1
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
