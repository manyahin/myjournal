<template>
  <div class="date-picker">
    <b-field label="Select a date" label-position="on-border">
      <b-datepicker
        v-model="selectedDate"
        locale="en-US"
        placeholder="Click to select..."
        icon="calendar-today"
        trap-focus
      ></b-datepicker>
      <p class="control">
        <b-button class="button is-danger" @click="selectedDate = null"
          >Reset</b-button
        >
      </p>
    </b-field>
  </div>
</template>

<script>
export default {
  // props: {
  //   postDate
  // },
  data() {
    return {
      showTimePanel: false,
      selectedDate: null
    }
  },
  methods: {
    openDatePicker() {
      console.log(this.$refs.datePicker.$el.querySelector('input'))
      // this.$refs.datePicker.$el.querySelector('input').select()
      this.$refs.datePicker.onFocus()
    },
    toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel
    }
  }
}
</script>

<style scoped>
.datepicker {
  width: 100%;
}
</style>
