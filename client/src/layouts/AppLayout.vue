<template>
  <div id="app">
    <div class="header">
        <div class="pure-menu pure-menu-horizontal">
            <a class="pure-menu-heading" href="">My Diary</a>

            <ul class="pure-menu-list">
                <li class="pure-menu-item"><router-link class="pure-menu-link" to="/write">Write</router-link></li>
                <li class="pure-menu-item"><router-link class="pure-menu-link" to="/read">Read</router-link></li>
                <li class="pure-menu-item"><a class="logout pure-menu-link" @click="logout">Logout</a></li>
            </ul>
        </div>
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
.pure-menu-horizontal {
  margin-top: 10px;
}

a.logout {
  cursor: pointer;
  font-size: 9px;
}
</style>
