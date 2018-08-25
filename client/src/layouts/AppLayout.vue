<template>
  <div id="app">
    <div class="nav pure-menu pure-menu-horizontal">
      <h3>My Diary</h3>
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link class="pure-menu-link" to="/write">Write</router-link></li>
        <li class="pure-menu-item"><router-link class="pure-menu-link" to="/read">Read</router-link></li>
        <li class="pure-menu-item"><a class="logout pure-menu-link" @click="logout">Logout</a></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import auth from '@/utils/auth'

export default {
  methods: {
    logout () {
      auth.logout()
    }
  }
}
</script>

<style>
a.logout {
  cursor: pointer;
  font-size: 10px;
}
</style>
