<template>
  <div v-show="status" class="loading">
    <img src="static/ajax-loader.gif" alt="Loading..." />
    <span>Loading</span>
  </div>
</template>

<script>
export default {
  props: {
    status: Boolean
  }
}
</script>

<style scoped>
.loading {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
}
.loading span {
  color: grey;
  display: block;
  margin-top: 10px;
  font-size: 12px;
  text-transform: uppercase;
}
</style>
