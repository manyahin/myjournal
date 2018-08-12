<template>
  <form action="#">
    <label for="password">Password:</label>
    <input type="text" name="password">
    <button @click="login">Login</button>
  </form>
</template>

<script>
export default { 
  methods: {
    login: () => {
      // this.$store.commit('SET_LAYOUT', 'app-')
      localStorage.setItem('token', '123')
      console.log('this')
    }
  }
}
</script>