<template>
  <div class="date-picker">
    <b-field label="Select a date" label-position="on-border">
      <b-datepicker
        v-model="selectedDate"
        locale="en-GB"
        placeholder="Click to select..."
        icon="calendar-today"
        trap-focus
      ></b-datepicker>
      <p class="control">
        <b-button class="button is-danger" @click="clearDate">Reset</b-button>
      </p>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null
    }
  },
  methods: {
    clearDate() {
      this.selectedDate = null
    }
  },
  watch: {
    selectedDate: function (date) {
      this.$emit('selectDate', date)
    }
  }
}
</script>

<style scoped>
.datepicker {
  width: 100%;
}
</style>
