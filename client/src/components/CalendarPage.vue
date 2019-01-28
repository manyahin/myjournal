<template>
  <div class="calendar">
    <div class="year">
      <h2>2017</h2>
      <div class="month">
        <h4>Januare</h4>
        <ul class="day">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
        </ul>
      </div>
      <div class="month">
        <h4>Februare</h4>
        <ul class="day">
         <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
        </ul>
      </div>
      <div class="month">
        <h4>March</h4>
        <ul class="day">
         <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
        </ul>
      </div>   
    </div>
    <div class="year">
      <h2>2018</h2>  
      <div class="month">
        <h4>Januare</h4>
        <ul class="day">
         <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
        </ul>
      </div>
      <div class="month">
        <h4>Februare</h4>
        <ul class="day">
         <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
        </ul>
      </div>
      <div class="month">
        <h4>March</h4>
        <ul class="day">
         <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async created () {
    // todo: check for empty result (new user)
    const data = await this.getAllNotesHeaders() || []

    if (!data[0]) return

    const firstDate = this.$moment(data[0]).startOf('month')
    const currentDate = this.$moment().startOf('day')

    let dates = [firstDate]

    do {
      dates.push(this.$moment(dates[dates.length - 1]).add(1, 'day').startOf('day'))
    } while (dates[dates.length - 1] < currentDate)

    console.log(dates)

    // rebase

    let calendar = {}

    dates.forEach(date => {
      let year = date.format('YYYY')
      let month = date.format('MMMM')
      let day = date.format('D')

      if (!calendar[year]) calendar[year] = {}
      if (!calendar[year][month]) calendar[year][month] = {}

      calendar[year][month][day] = {}
    })    

    console.log(calendar)
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

      return data.map(el => el.created_at)
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
</style>