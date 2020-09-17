<template>
  <section>
    <form @submit.prevent="saveNote">
      <fieldset>
        <b-input
          type="textarea"
          placeholder="What happened?"
          required
          v-model.trim="body"
          @keydown.enter.native="handleCmdEnter($event)"
        >
          <!-- autofocus="true" - for textarea cause red border around -->
        </b-input>

        <b-collapse
          :open="showSettings"
          class="card mt-4"
          animation="slide"
          aria-id="settingsContent"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header is-shadowless"
            role="button"
            aria-controls="settingsContent"
          >
            <p class="card-header-title">Additional settings</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"> </b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              <date-picker
                ref="datePicker"
                @selectDate="selectDate"
              ></date-picker>
            </div>
          </div>
        </b-collapse>

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
      postDate: null,
      showSettings: false
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

      if (this.postDate) {
        note.created_at = this.postDate
        note.custom_date = true
      } else {
        note.created_at = new Date()
      }

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

      this.postDate = null
      this.$refs.datePicker.clearDate()
    },
    handleCmdEnter({ ctrlKey, metaKey }) {
      if (ctrlKey || metaKey) {
        this.saveNote()
      }
    },
    selectDate(date) {
      this.postDate = date
    }
  }
}
</script>

<style scoped>
form {
  margin-bottom: 15px;
}
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
.settings {
  padding: 0.75rem;
}
</style>
