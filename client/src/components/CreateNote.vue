<template>
  <form class="pure-form">
    <fieldset>
      <textarea
        placeholder="What happened?"
        autofocus=true
        required
        v-model="body"
        @keydown.enter="handleCmdEnter($event)">
      </textarea>
      <button class="pure-button" @click="saveNote" type="submit">Write</button>
      <div class="message" v-show="message">{{ message }}</div>
      <notes-list :notes="notes"></notes-list>
    </fieldset>
  </form>
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
      body: '',
      message: '',
      notes: []
    }
  },
  created () {
    this.getNewestNotes()
  },
  methods: {
    async getNewestNotes () {
      let { data } = await axios.get('http://localhost:3000/api/Notes?filter={"limit":"5", "order": "created_at DESC"}')
      this.notes = data
    },
    saveNote () {
      this.message = ''

      if (!this.body.length) {
        this.message = 'The note cannot be empty'
        return
      }

      let note = {}
      note.created_at = new Date()
      note.body = this.body

      axios.post('http://localhost:3000/api/Notes', note)
        .then(this.noteSaved)
        .then(this.getNewestNotes)
        .then(this.clearBody)
    },
    noteSaved ({data}) {
      this.message = `Note ID ${data.note_id}
        , Written ${data.count_symbols} symbols`
    },
    handleCmdEnter ({ctrlKey, metaKey}) {
      if (ctrlKey || metaKey) {
        this.saveNote()
      }
    },
    clearBody () {
      this.body = ''
    }
  }
}
</script>

<style scoped>
  textarea {
    width: 100%;
    height: 150px;
    border: 1px solid #0F595B;
    border-radius: 4px;
    display: block;
    font-size: inherit;
    padding: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /* Hack: autofocus attr cause red border since page loaded,
     disable it for textarea */
  textarea:required:invalid {
    border: 1px solid #1A2943 !important;
    color: white !important;
  }
  button[type="submit"] {
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
    background-color: #0F595B;
    border: 1px solid #1A2943;
    color: white;
    padding: 4px 6px;
    font-size: 20px;
    font-weight: 200;
  }
  .message {
    margin-top: 15px;
  }
</style>
