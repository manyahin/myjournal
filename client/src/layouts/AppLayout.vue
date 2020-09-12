<template>
  <section>
    <b-navbar>
      <template slot="brand">
        <!-- why reload page? -->
        <b-navbar-item tag="a" href="">My Diary</b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" to="/write">Write</b-navbar-item>
        <b-navbar-item tag="router-link" to="/read">Read</b-navbar-item>
        <b-navbar-item class="logout" @click="logout">Logout</b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </section>
</template>

<script>
import auth from '@/utils/auth'

export default {
  methods: {
    logout() {
      auth.logout()
    }
  }
}
</script>

<style lang="scss">
.navbar {
  .router-link-active {
    font-weight: bold;
  }
  .logout {
    cursor: pointer;
    font-size: 9px;
  }
}
</style>
