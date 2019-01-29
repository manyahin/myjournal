<template>
  <div>
    <router-link :to="{ name: 'calendar' }">Back to Calendar</router-link>
    <h3 v-show="!notes.length">No notes for this day</h3>
    <notes-list :notes="notes"></notes-list>
    <router-link :to="{ name: 'calendarDay', params: { date: previousDay }}">Previous day</router-link>
    <router-link :to="{ name: 'calendarDay', params: { date: nextDay }}">Next day</router-link>
  </div>
</template>

<script>
import axios from 'axios'
import NotesList from '@/components/NotesList'

export default {
  data () {
    return {
      date: this.$moment(this.$route.params.date, 'YYYY-MM-DD'),
      notes: []
    }
  },
  components: {
    NotesList
  },
  computed: {
    nextDay () {
      return this.$moment(this.date).add(1, 'day').format('YYYY-MM-DD')
    },
    previousDay () {
      return this.$moment(this.date).subtract(1, 'day').format('YYYY-MM-DD')
    }
  },
  async created () {
    await this.getPostForSpecificDate()

    this.handleKeys()
  },
  watch: {
    async '$route' (to, from) {
      this.date = this.$moment(this.$route.params.date, 'YYYY-MM-DD')
      await this.getPostForSpecificDate()
    }
  },
  methods: {
    async getPostForSpecificDate () {
      const filter = {
        where: {
          and: [
            {
              created_at: {
                gte: this.date.startOf('day').toISOString()
              }
            },
            {
              created_at: {
                lte: this.date.endOf('day').toISOString()
              }
            }
          ]
        },
        order: 'created_at ASC'
      }

      let { data } = await axios.get('Notes?filter=' + JSON.stringify(filter))

      this.notes = data
    },
    handleKeys () {
      window.addEventListener('keydown', e => {
        if (e.keyCode === 39) { // right
          this.goNextDay()
        } else if (e.keyCode === 37) { // left
          this.goPreviousDay()
        }
      })
    },
    goNextDay () {
      this.$router.push({name: 'calendarDay', params: {date: this.nextDay}})
    },
    goPreviousDay () {
      this.$router.push({name: 'calendarDay', params: {date: this.previousDay}})
    }
  }
}
</script>

<style>

</style>
