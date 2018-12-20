<template>
  <div class="note">
    <div class="header pure-g">
      <div class="time pure-u-1-2">{{ note.created_at | moment('HH:mm') }}</div>
      <div class="actions pure-u-1-2">
        <img @click="note.favorite = !note.favorite" :src="starIconSrc" alt="star" class="star-icon" :class="{opacity: !note.favorite}">
      </div>
    </div>
    <div class="body">{{ note.body }}</div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object
    }
  },
  computed: {
    starIconSrc () {
      return '/static/' + (this.note.favorite ? 'star_filled.png' : 'star.png')
    }
  }
}
</script>

<style scoped>
.actions {
  text-align: right;
}
.note {
  padding: 8px 0;
  border-bottom: 1px solid rgba(1,1,1,0.1);
}
.note .body {
  white-space: pre-line;
  line-height: 1.3em;
}
.note .time {
  color: grey;
  line-height: 26px;
  font-size: 15px;
  font-weight: 100;
}
.star-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.opacity {
  opacity: 0.2;
}
</style>
