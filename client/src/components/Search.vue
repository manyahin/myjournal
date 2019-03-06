<template>
  <div class="search">
    <form id="submit" @submit="submitForm">
      <input required type="text" placeholder="text to search" v-model="text">
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    },
    methods: {
      submitForm() {
        this.$emit('onSubmit', this.text)
      }
    }
  }
</script>