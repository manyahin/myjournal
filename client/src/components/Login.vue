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

        <p class="red">{{ errorMessage }}</p>
      </fieldset>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:3000/api/Customers/login', {
        email: this.email,
        password: this.password
      })
        .then(res => {
          localStorage.setItem('token', res.data.id)
          this.$router.go('/')
        })
        .catch(err => {
          this.errorMessage = err.response.data.error.message
        })
    }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
