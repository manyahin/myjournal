<template>
  <div class="date-picker">
    <b-field label="Select a date">
      <b-datepicker
        v-model="selectedDate"
        locale="en-US"
        placeholder="Click to select..."
        icon="calendar-today"
        trap-focus
      ></b-datepicker>
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
      selectedDate: undefined,
    };
  },
  methods: {
    openDatePicker() {
      console.log(this.$refs.datePicker.$el.querySelector("input"));
      // this.$refs.datePicker.$el.querySelector('input').select()
      this.$refs.datePicker.onFocus();
    },
    toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel;
    },
  },
};
</script>

<style>
.hide {
  display: none;
}
</style>
