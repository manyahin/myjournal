<template>
  <section class="notes">
    <h3>Last notes:</h3>

    <ul>
      <li>7 Aug</li>
      <li>
        <ul>
          <li>11:32 - lala</li>
          <li>11:32 - bebe</li>
        </ul>
      </li>
      <li>6 Aug</li>
      <li>
        <ul>
          <li>20:44 - ohoho</li>
        </ul>
      </li>
    </ul>

    <ul>
      <li v-for="(note, index) in notes" :key="index">
        Note ID: {{ note.id }} : {{ getProperDateFormat(note.created_at) }} - {{ note.content }}
      </li>
    </ul>
  </section>
</template>

<script>
import moment from 'moment'

// moment.locale('ru')

// let data = [
//   {
//     date: '7 aug',
//     notes: [
//       {
//         time: '11:12',
//         body: 'Hello!'
//       },
//       {
//         time: '11:12',
//         body: 'Hello!'
//       }
//     ]
//   }
// ]

export default {
  props: {
    notes: {
      type: Array
    }
  },
  head () {
    return {
      title: 'Write note'
    }
  },
  // computed: {
  //   dayTimeNotesRange () {

  //   }
  // },
  methods: {
    getProperDateFormat (date) {
      return moment(date).format('ddd, Do MMM YYYY; HH:mm:ss')
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 10px;
}
</style>
