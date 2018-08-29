<template>
  <div>
    <form class="pure-form">
      <fieldset>
        <textarea
          placeholder="What happened?"
          autofocus=true
          required
          v-model.trim="body"
          @keydown.enter="handleCmdEnter($event)">
        </textarea>
        <div class="pure-g">
          <div class="pure-u-2-3 message">{{ message }}</div>
          <div class="pure-u-1-3">
            <button class="pure-button" @click="saveNote" type="submit">Write</button>
          </div>
        </div>
      </fieldset>
    </form>
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
      let { data } = await axios.get('Notes?filter={"limit":"50", "order": "created_at DESC"}')
      this.notes = data
    },
    saveNote (e) {
      if (e) e.preventDefault()

      this.message = ''

      if (!this.body.length) {
        this.message = 'The note cannot be empty'
        return
      }

      let note = {}
      note.created_at = new Date()
      note.body = this.body

      axios.post('Notes', note)
        .then(this.noteSaved)
        .then(this.clearBody)
    },
    noteSaved ({data}) {
      this.notes.unshift({
        id: data.id,
        created_at: data.created_at,
        body: data.body
      })

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
    caret-color: grey;
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
    font-size: 15px;
    margin-top: 15px;
  }
</style>
