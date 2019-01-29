<template>
  <div class="calendar">
    <div class="year" v-for="(year, yearId) in calendar" :key="yearId">
      <h2>{{ yearId }}</h2>
      <div class="month" v-for="(month, monthId) in year" :key="monthId">
        <h4>{{ monthId }}</h4>
        <ul class="day">
          <li :class="{'active': day.cnt > 0 }" v-for="(day, dayId) in month" :key="dayId">
            <router-link :to="{ name: 'calendarDay', params: { date: day.format }}">{{ dayId }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      calendar: {}
    }
  },
  async created () {
    // todo: check for empty result (new user)
    const data = await this.getAllNotesHeaders()

    // make list of available dates
    const firstDate = data.firstDate.startOf('month')
    const currentDate = this.$moment().startOf('day')

    let dates = [firstDate]

    do {
      dates.push(this.$moment(dates[dates.length - 1]).add(1, 'day').startOf('day'))
    } while (dates[dates.length - 1] < currentDate)

    // prepare format for calendar

    let preCalendar = {}

    dates.forEach(date => {
      let year = date.format('YYYY')
      let month = date.format('MMMM')
      let day = date.format('D')

      if (!preCalendar[year]) preCalendar[year] = {}
      if (!preCalendar[year][month]) preCalendar[year][month] = {}

      preCalendar[year][month][day] = {
        format: date.format('YYYY-MM-DD'),
        cnt: 0
      }

      if (data.activities[date.format('YYYY-MM-DD')]) {
        preCalendar[year][month][day].cnt = data.activities[date.format('YYYY-MM-DD')].cnt
      }
    })

    this.calendar = preCalendar
  },
  methods: {
    async getAllNotesHeaders () {
      const filter = {
        fields: {
          created_at: true
        },
        order: 'created_at ASC'
      }

      let { data } = await axios.get('Notes?filter=' + JSON.stringify(filter))

      // make list of dates with cnt of posts
      const activities = data
        .map(el => el.created_at)
        .reduce((acc, curr) => {
          let ts = this.$moment(curr).startOf('day').format('YYYY-MM-DD')

          if (acc.hasOwnProperty(ts)) {
            acc[ts].cnt++
          } else {
            acc[ts] = {cnt: 1}
          }

          return acc
        }, {})

      // search for first date
      const dates = Object.keys(activities)
      let firstDate = this.$moment(dates[0])

      dates.forEach(date => {
        if (this.$moment(date) < firstDate) {
          firstDate = this.$moment(date)
        }
      })

      return {
        firstDate,
        activities
      }
    }
  }
}
</script>

<style>
ul.day {
  list-style-type: none;
  padding-left: 0;
}

ul.day li {
  display: inline-block;
  padding: 3px;
  border: 1px solid grey;
  margin: 5px 5px 0 0;
}

ul.day li.active {
  background-color: lightgreen;
  cursor: pointer;
}
</style>
