<template>
  <section class="container login box">
    <h1 class="title">My Diary</h1>
    <form @submit.prevent="login">
      <!-- <b-field class="email-field">
        <b-input
          v-model="email"
          icon="email"
          type="email"
          placeholder="Email"
          required>
        </b-input>
      </b-field>-->

      <b-field class="password-field">
        <b-input v-model="password" icon="lock" type="password" placeholder="Password" required></b-input>
      </b-field>

      <!-- <div class="field">
        <b-checkbox v-model="rememberMe">Remember me for a week</b-checkbox>
      </div>-->

      <b-button native-type="submit" type="is-primary">Sign in</b-button>

      <b-message v-show="message" :type="messageType" class="custom-message">{{ message }}</b-message>
    </form>
  </section>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      email: 'user@mail.com',
      // rememberMe: '',
      password: '',
      messageType: '',
      message: ''
    }
  },
  methods: {
    login(e) {
      this.resetMessage()
      this.message = 'Loading...'

      axios
        .post('Customers/login', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem('token', res.data.id)

          this.message = 'Success! Redirecting...'
          this.messageType = 'is-success'

          window.location = '/'
        })
        .catch(err => {
          this.message =
            _.get(err, 'response.data.error.message') || 'Connection problem'
          this.messageType = 'is-danger'
        })
    },
    resetMessage() {
      this.message = ''
      this.messageType = ''
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Merriweather', 'Georgia', serif;
  margin-bottom: 30px;
}
.login {
  margin: 50px auto;
  width: 300px;
}
.password-field {
  height: 60px;
}
.custom-message {
  margin-top: 25px;
}
</style>
