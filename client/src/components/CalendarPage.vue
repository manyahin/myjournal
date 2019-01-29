<template>
  <div class="calendar">
    <div class="year" v-for="(year, yearId) in calendar">
      <h2>{{ yearId }}</h2>
      <div class="month" v-for="(month, monthId) in year">
        <h4>{{ monthId }}</h4>
        <ul class="day">
          <li :class="{'active': day.cnt > 0 }" v-for="(day, dayId) in month">
            {{ dayId }}  
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
    const firstDate = this.$moment(data.firstDate).startOf('month')
    const currentDate = this.$moment().startOf('day')

    let dates = [firstDate]

    do {
      dates.push(this.$moment(dates[dates.length - 1]).add(1, 'day').startOf('day'))
    } while (dates[dates.length - 1] < currentDate)

    console.log(dates)

    // prepare format for calendar

    let preCalendar = {}

    dates.forEach(date => {
      let year = date.format('YYYY')
      let month = date.format('MMMM')
      let day = date.format('D')

      if (!preCalendar[year]) preCalendar[year] = {}
      if (!preCalendar[year][month]) preCalendar[year][month] = {}

      preCalendar[year][month][day] = { cnt: 0 }

      if (data.activities[date.format('L')]) {
        preCalendar[year][month][day] = data.activities[date.format('L')]
      }
    })

    console.log(preCalendar)

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
        .map(el => this.$moment(el.created_at).startOf('day').format('L'))
        .reduce((acc, curr) => {
          if (acc.hasOwnProperty(curr)) {
            acc[curr].cnt++
          }
          else {
            acc[curr] = {cnt: 1}
          }
          return acc
        }, {})

      // search for first date
      const dates = Object.keys(activities)
      let firstDate = this.$moment(dates[0])

      dates.forEach(date => {
        if (this.$moment(date) < firstDate) 
          firstDate = this.$moment(date)
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
}

ul.day li {
  display: inline-block;
  padding: 3px;
  border: 1px solid grey;
}

ul.day li.active {
  background-color: lightgreen;
}
</style>