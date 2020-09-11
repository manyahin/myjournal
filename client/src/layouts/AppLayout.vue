<template>
  <section>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="a" href="">My Diary</b-navbar-item>
      </template>
      <template slot="end">
        <!-- TODO: add active color -->
        <b-navbar-item tag="router-link" to="/write">Write</b-navbar-item>
        <b-navbar-item tag="router-link" to="/read">Read</b-navbar-item>
        <b-navbar-item tag="a" class="logout" to="/read" @click="logout"
          >Logout</b-navbar-item
        >
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

<style>
a.logout {
  cursor: pointer;
  font-size: 9px;
}
</style>
