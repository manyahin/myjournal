<template>
  <div class="calendar">
    <loading :status="loading"></loading>
    <nav >
      <p>Navigation by year:</p>
      <ul>
        <li v-for="(year, yearId) in calendar" :key="'li' + yearId">
          <!-- todo: broke the URL -->
          <a :href="'#' + yearId">{{ yearId }}</a>
        </li>
      </ul>
    </nav>
    <div class="year" v-for="(year, yearId) in calendar" :key="yearId">
      <h2 :id="yearId">{{ yearId }}</h2>
      <div class="month" v-for="(month, monthId) in year" :key="monthId">
        <h3>{{ monthId }}</h3>
        <div class="v-month">
          <div class="v-weekday">S</div>
          <div class="v-weekday">M</div>
          <div class="v-weekday">T</div>
          <div class="v-weekday">W</div>
          <div class="v-weekday">T</div>
          <div class="v-weekday">F</div>
          <div class="v-weekday">S</div>
          <div class="v-day" v-for="index in month[1].weekday" :key="'PRE' + index"/>
          <div class="v-day" v-for="(day, dayId) in month" :key="dayId"
            :class="{'active': day.cnt > 0 }"
            :style="generateBackgroundColor(day.cnt)" >
            <router-link :to="{ name: 'calendarDay', params: { date: day.format }}">
              <div class="day" :class="{'current': day.current == true }">{{ dayId }}</div>
            </router-link>
          </div>
          <div class="v-day" v-for="index in getCountOfLeftDaysInMonth(month)" :key="'AFT' + index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/Loading.vue'

// todo: add option to change a first day of week
// todo: change color of a day depends on count of posts

export default {
  data () {
    return {
      calendar: {},
      loading: true
    }
  },
  components: {
    Loading
  },
  async created () {
    // todo: check for empty result (new user)

    const data = await this.getAllNotesHeaders()

    // make list of available dates
    const firstDate = data.firstDate.startOf('month')
    const endDate = data.lastDate.endOf('month')

    let dates = [firstDate]

    while (dates[dates.length - 1] < endDate) {
      dates.push(this.$moment(dates[dates.length - 1]).add(1, 'day').endOf('day'))
    }

    // prepare calendar
    let calendar = {}

    dates.forEach(date => {
      let year = date.format('YYYY')
      let month = date.format('MMMM')
      let day = date.format('D')

      if (!calendar[year]) calendar[year] = {}
      if (!calendar[year][month]) calendar[year][month] = {}

      calendar[year][month][day] = {
        format: date.format('YYYY-MM-DD'),
        cnt: 0,
        weekday: parseInt(date.format('d')),
        current: false
      }

      if (data.activities[date.format('YYYY-MM-DD')]) {
        calendar[year][month][day].cnt = data.activities[date.format('YYYY-MM-DD')].cnt
      }
    })

    // set the current day
    calendar[this.$moment().format('YYYY')][this.$moment().format('MMMM')][this.$moment().format('D')].current = true

    this.calendar = calendar
    this.loading = false
  },
  methods: {
    generateBackgroundColor (cnt) {
      if (cnt > 0) {
        return {
          'background-color': 'rgba(53, 157, 39, ' + (cnt / 10) + ')'
        }
      }
    },
    getCountOfLeftDaysInMonth (month) {
      let dayNums = Object.keys(month).map(el => parseInt(el))
      let lastDay = month[Math.max.apply(null, dayNums)]
      return 6 - parseInt(lastDay.weekday)
    },
    async getAllNotesHeaders () {
      const filter = {
        fields: {
          created_at: true
        },
        order: 'created_at ASC'
      }

      let { data } = await axios.get('Notes?filter=' + JSON.stringify(filter))

      // create a list of days with count of posts
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
      let lastDate = this.$moment(dates[dates.length - 1])

      return {
        firstDate,
        lastDate,
        activities
      }
    }
  }
}
</script>

<style>
.calendar {
  margin-bottom: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 10px;
}

nav ul li a {
  color: black;
}

.month {
  display: inline-block;
  margin-right: 10px;
}

.v-month {
  display: grid;
  grid-template-columns: repeat(7,1fr);
  position: relative;
  padding: 5px;
  width: 210px;
  row-gap: 5px;
}

.v-month .v-weekday {
  font-weight: bold;
}

.v-month .v-weekday, .v-month .v-day {
  text-align: center;
  padding: 3px;
  border: 1px solid grey;
  width: 18px;
  height: 18px;
}

.v-month .v-day a {
  text-decoration: none;
  color: black;
}

.v-month .v-day .day.current {
  font-weight: bold;
}

.v-month .active {
  /* background-color: lightgreen; */
  cursor: pointer;
}
</style>
