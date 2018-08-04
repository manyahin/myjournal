<template>
  <div id="app">
    <div class="nav pure-menu pure-menu-horizontal">
      <h3>Private Diary</h3>
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link class="pure-menu-link" to="/write">Write</router-link></li>
        <li class="pure-menu-item"><router-link class="pure-menu-link" to="/read">Read</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 20px;
}
.nav {
  margin-bottom: 10px;
}
.nav a.router-link-active {
  color: #000;
}
</style>
