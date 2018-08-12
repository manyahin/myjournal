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
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import auth from '@/utils/auth'

export default {
  methods: {
    logout: auth.logout
  }
}
</script>