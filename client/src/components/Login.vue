<template>
  <form class="pure-form pure-form-stacked" @submit.prevent="login">
    <fieldset>
        <h3>My Journal</h3>

        <!--
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="Email" v-model="email" required>
        -->

        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Password" v-model="password" required>

        <!--
        <label for="remember" class="pure-checkbox">
            <input id="remember" type="checkbox"> Remember me for a week
        </label>
        -->

        <button type="submit" class="pure-button pure-button-primary">Sign in</button>

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
      email: 'user@mail.com',
      password: '',
      errorMessage: '',
      notifyMessage: ''
    }
  },
  methods: {
    login (e) {
      this.resetMessages()

      axios.post('Customers/login', {
        email: this.email,
        password: this.password
      })
        .then(res => {
          localStorage.setItem('token', res.data.id)
          this.notifyMessage = 'Loading...'
          window.location = '/'
        })
        .catch(err => {
          this.errorMessage = _.get(err, 'response.data.error.message') || 'Connection problem'
        })
    },
    resetMessages () {
      this.errorMessage = ''
      this.notifyMessage = ''
    }
  }
}
</script>

<style scoped>
form {
  margin: 50px auto;
  width: 200px;
}
button {
  margin-top: 14px;
}
.red {
  color: red;
}
</style>
