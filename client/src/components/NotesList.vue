<template>
  <section class="notes">
    <ul>
      <li v-for="(notes, index) in sortedNotes" :key="index">
        <p class="heading day has-text-weight-semibold">
          {{ new Date(parseInt(index)) | moment('dddd, MMM Do YY') }}
        </p>
        <ul>
          <li v-for="(note, i) in notes" :key="i">
            <note :note="note"></note>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import Note from '@/components/Note'

export default {
  components: {
    Note
  },
  props: {
    notes: Array
  },
  computed: {
    sortedNotes() {
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
.day {
  margin-top: 1rem;
  font-size: 14px;
}
.notes {
  word-wrap: break-word;
}
ul {
  list-style: none;
  padding-left: 0;
}
</style>
