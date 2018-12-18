<template>
  <section class="notes">
    <ul>
      <li v-for="(notes, index) in sortedNotes" :key="index">
        <h4>{{ new Date(parseInt(index)) | moment("dddd, MMM Do YY") }}</h4>
        <ul>
          <li v-for="(note, i) in notes" :key="i">
            <div class="note">
              <div class="time">{{ note.created_at | moment('HH:mm') }}</div>
              <div class="body">{{ note.body }}</div>
              <div class="footer">
                <img @click="favorite(note)" :src="'/static/' + (note.favorite ? 'star-48.png' : 'star-filled-48.png')" alt="star" class="star-icon">
              </div>
            </div>
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
    },
    starIcon: 'star-48.png'
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
  },
  methods: {
    favorite (note) {
      console.log(note)
      note.favorite = !note.favorite
    }
  }
}
</script>

<style scoped>
h4 {
  margin-top: 2px;
  margin-bottom: 12px;
}
.notes {
  word-wrap: break-word
}
ul {
  list-style: none;
  padding-left: 0;
}
ul li {
  /*border: 1px solid rgba(1,1,1,0.2);*/
}
.note {
  margin-bottom: 8px;
  line-height: 1.3em;
  white-space: pre-line;
  border-bottom: 1px solid rgba(1,1,1,0.1);
}
.note .time {
  margin-bottom: 4px;
  color: grey;
  font-size: 14px;
  /*font-style: italic;*/
}
.note .body {
  margin-bottom: 6px;
}
.note .footer {
  margin-bottom: 6px;
}
.star-icon {
  width: 24px;
  height: 24px;
  opacity: 0.5;
}
.star-icon:hover {
  opacity: 1;
}
</style>
