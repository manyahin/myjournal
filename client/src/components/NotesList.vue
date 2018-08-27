<template>
  <section class="notes">
    <ul>
      <li v-for="(notes, index) in sortedNotes" :key="index">
        <h4>{{ new Date(parseInt(index)) | moment("dddd, MMMM Do YYYY") }}</h4>
        <ul>
          <li v-for="(note, i) in notes" :key="i" class="note">
            <small>{{ note.created_at | moment('HH:mm') }} - </small>{{ note.body }}
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  props: {
    notes: {
      type: Array
    }
  },
  computed: {
    sortedNotes () {
      let sortedNotes = {}

      this.notes.forEach(note => {
        let day = new Date(note.created_at)
        day.setHours(0, 0, 0, 0)

        let notes = sortedNotes[day.getTime()] || []
        notes.push(note)

        sortedNotes[day.getTime()] = notes
      })

      return sortedNotes
    }
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    padding-left: 0;
  }
  li.note {
    margin-bottom: 10px;
    line-height: 1.3em;
    white-space: pre-line;
  }
</style>
