<template>
  <section>
    <form @submit.prevent="saveNote">
      <fieldset>
        <b-input
          type="textarea"
          placeholder="What happened?"
          required
          v-model.trim="body"
          @keydown.enter="handleCmdEnter($event)"
        >
          <!-- autofocus="true" - for textarea cause red border around -->
        </b-input>
        <div class="columns controls is-mobile">
          <div class="column system-message">
            <span v-show="message">{{ message }}</span>
            <img
              v-show="loading"
              src="static/ajax-loader.gif"
              alt="Loading..."
            />
          </div>
          <div class="column is-one-third">
            <b-button native-type="submit" type="is-primary" :disabled="loading"
              >Write</b-button
            >
          </div>
        </div>
        <!-- <div class="columns">
          <div class="column">
            <date-picker :postDate="postDate"></date-picker>
          </div>
        </div> -->
      </fieldset>
    </form>
    <infinite-notes-list order="desc" ref="notes"></infinite-notes-list>
  </section>
</template>

<script>
import NoteService from '@/services/NoteService'
import InfiniteNotesList from '@/components/InfiniteNotesList'
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    InfiniteNotesList,
    DatePicker
  },
  data() {
    return {
      body: '',
      message: '',
      loading: false,
      postDate: undefined
    }
  },
  methods: {
    saveNote() {
      this.message = ''
      this.loading = true

      if (!this.body.length) {
        this.message = 'The note cannot be empty'
        this.loading = false
        return
      }

      let note = {}
      note.created_at = this.postDate || new Date()
      note.body = this.body

      NoteService.addNote(note)
        .then(this.$refs.notes.addNote(note))
        .then(this.successMessage)
        .then(this.clearBody)
    },
    successMessage({ data }) {
      this.message = `Written ${data.count_symbols} symbols`
    },
    clearBody() {
      this.body = ''
      this.loading = false
    },
    handleCmdEnter({ ctrlKey, metaKey }) {
      if (ctrlKey || metaKey) {
        this.saveNote()
      }
    }
  }
}
</script>

<style scoped>
button[type='submit'] {
  width: 100%;
}
.controls {
  margin-top: 5px;
}
.system-message {
  line-height: 35px;
}
.post-date {
  margin-top: 10px;
  text-align: right;
}
</style>
