<template>
  <div class="calendar-day">
    <div class="container top-nav">
      <router-link :to="{ name: 'calendar' }" class="return-to-calendar"
        >← Back to Calendar</router-link
      >
    </div>
    <loading :status="loading"></loading>
    <notes-list :notes="notes" :loading="loading"></notes-list>
    <div class="bottom-nav">
      <router-link
        class="button next-day"
        :to="{ name: 'calendarDay', params: { date: previousDay } }"
        >Previous day</router-link
      >
      <router-link
        class="button previous-day"
        :to="{ name: 'calendarDay', params: { date: nextDay } }"
        >Next day</router-link
      >
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NotesList from '@/components/NotesList'
import Loading from '@/components/Loading'

export default {
  data() {
    return {
      date: this.$moment(this.$route.params.date, 'YYYY-MM-DD'),
      notes: [],
      loading: true
    }
  },
  components: {
    NotesList,
    Loading
  },
  computed: {
    nextDay() {
      return this.$moment(this.date).add(1, 'day').format('YYYY-MM-DD')
    },
    previousDay() {
      return this.$moment(this.date).subtract(1, 'day').format('YYYY-MM-DD')
    }
  },
  async created() {
    this.loading = true
    await this.getPostForSpecificDate()
    this.loading = false

    // todo: this thing doesn't work correctly
    // this.handleKeys()
  },
  watch: {
    async $route(to, from) {
      this.loading = true
      this.notes = []
      this.date = this.$moment(this.$route.params.date, 'YYYY-MM-DD')
      await this.getPostForSpecificDate()
      this.loading = false
    }
  },
  methods: {
    async getPostForSpecificDate() {
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
    handleKeys() {
      window.addEventListener('keydown', e => {
        if (e.keyCode === 39) {
          // right
          this.goNextDay()
        } else if (e.keyCode === 37) {
          // left
          this.goPreviousDay()
        }
      })
    },
    goNextDay() {
      this.$router.push({ name: 'calendarDay', params: { date: this.nextDay } })
    },
    goPreviousDay() {
      this.$router.push({
        name: 'calendarDay',
        params: { date: this.previousDay }
      })
    }
  }
}
</script>

<style scoped>
.top-nav {
  margin-bottom: 1rem;
}

.return-to-calendar {
  color: black;
  margin-bottom: 1rem;
}

.calendar-day {
  margin-bottom: 20px;
}

.bottom-nav {
  margin-top: 1rem;
}

.bottom-nav .next-day {
  float: left;
}

.bottom-nav .previous-day {
  float: right;
}
</style>
