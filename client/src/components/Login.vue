<template>
  <form class="pure-form pure-form-stacked">
    <fieldset>

        <p>donqu@mail.com / qwerty</p>

        <label for="email">Email</label>
        <input id="email" type="email" placeholder="Email" v-model="email">

        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Password" v-model="password">

        <!--
        <label for="remember" class="pure-checkbox">
            <input id="remember" type="checkbox"> Remember me for a week
        </label>
        -->

        <button @click="login" type="submit" class="pure-button pure-button-primary">Sign in</button>

        <p v-if="errorMessage" class="red">{{ errorMessage }}</p>
        <p v-if="notifyMessage">{{ notifyMessage }}</p>
      </fieldset>
  </form>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data () {
    return {
      email: '',
      password: '',
      errorMessage: '',
      notifyMessage: ''
    }
  },
  methods: {
    login () {
      this.resetForm()

      axios.post('http://localhost:3000/api/Customers/login', {
        email: this.email,
        password: this.password
      })
        .then(res => {
          localStorage.setItem('token', res.data.id)
          this.notifyMessage = 'Loading...'
          this.$router.go('/')
        })
        .catch(err => {
          this.errorMessage = _.get(err, 'response.data.error.message') || 'Connection problem'
        })
    },
    resetForm () {
      this.errorMessage = this.notifyMessage = ''
    }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
