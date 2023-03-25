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

        <div class="recaptcha-container">
          <span :hidden="!displayReCaptchaWaitMessage">ReCaptcha is loading...</span>
          <vue-recaptcha
            @verify="reCaptcheVerifyEvent"
            @expired="reCaptcheFailedEvent"
            @error="reCaptcheFailedEvent"
            @render="reCaptcheRenderEvent"
            sitekey="6LfNNi8lAAAAAO_bIF4rjHfJ7WASPXx1PvYJrU8_">
          </vue-recaptcha>
        </div>

        <button
          type="submit"
          class="pure-button pure-button-primary"
          :disabled="!reCaptchaResponse"
        >Sign in</button>

        <p v-if="errorMessage" class="red">{{ errorMessage }}</p>
        <p v-if="notifyMessage">{{ notifyMessage }}</p>
      </fieldset>
  </form>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  data () {
    return {
      email: 'user@mail.com',
      password: '',
      errorMessage: '',
      notifyMessage: '',
      displayReCaptchaWaitMessage: true,
      reCaptchaResponse: null
    }
  },
  components: { VueRecaptcha },
  methods: {
    login (e) {
      this.resetMessages()

      axios.post('Customers/login', {
        email: this.email,
        password: this.password,
        recaptcha: this.reCaptchaResponse
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
    },
    reCaptcheVerifyEvent (response) {
      if (response) {
        this.reCaptchaResponse = response
      }
    },
    reCaptcheFailedEvent (event) {
      console.log('reCaptcheFailedEvent', event)
    },
    reCaptcheRenderEvent () {
      this.displayReCaptchaWaitMessage = false
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
.recaptcha-container {
  height: 76px;
  margin-top: 14px;
}

.recaptcha-container span {
  color: grey;
  font-size: smaller;
}
</style>
