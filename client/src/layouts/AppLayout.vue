<template>
  <div id="app">
    <div class="header">
        <div class="pure-menu pure-menu-horizontal">
            <a class="pure-menu-heading" href="">My Diary</a>
            <ul class="pure-menu-list">
              <router-link class="pure-menu-item" active-class="pure-menu-selected" tag="li" to="/write">
                <a class="pure-menu-link">Write</a>
              </router-link>
              <router-link class="pure-menu-item" active-class="pure-menu-selected" tag="li" to="/read">
                <a class="pure-menu-link">Read</a>
              </router-link>
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
/* iPhone 5 fix */
@media screen and (max-width: 340px) {
  .pure-menu-horizontal {
    zoom: 0.9 !important;
  }
}

.pure-menu {
  overflow: hidden;
}

.pure-menu-list {
  float: right;
}

.pure-menu-horizontal {
  margin-top: 10px;
}

a.logout {
  cursor: pointer;
  font-size: 9px;
}
</style>
