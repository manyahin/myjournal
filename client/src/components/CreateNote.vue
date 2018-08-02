<template>
  <div class="form">
    <textarea
      placeholder="What happened?"
      autofocus=true
      required
      v-model="body"
      @keydown.enter="handleCmdEnter($event)">
    </textarea>
    <button @click="saveNote" type="submit">Write</button>
    <div v-show="error" class="error">{{ error }}</div>
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
      error: '',
      notes: []
    }
  },
  created () {
    this.getNewestNotes()
  },
  methods: {
    async getNewestNotes () {
      let { data } = await axios.get('http://localhost:3000/api/Notes?filter={"limit":"100"}')
      this.notes = data
    },
    saveNote () {
      this.error = ''

      if (!this.body.length) {
        this.error = 'The note cannot be empty'
        return
      }

      axios.post('http://localhost:3000/api/Notes', {'title': new Date().toString(), 'content': this.body})
        .then(({data}) => {
          console.log(data)
        })
        .then(this.getNewestNotes)
        .then(this.clearBody)
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
  * {
    margin: 0;
    padding: 0;
  }
  body {
    padding: 10px;
    font-size: 16px;
  }
  p {
    margin: 12px 0px;
  }
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
</style>
