<template>
  <div class="note">
    <div class="header pure-g">
      <div class="time pure-u-1-2">{{ note.created_at | moment('HH:mm') }}</div>
      <div class="actions pure-u-1-2">
        <!-- make like component -->
        <img @click="favorite(note)" :src="'/static/' + (note.favorite ? 'star-48.png' : 'star-filled-48.png')" alt="star" class="star-icon">
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
  }
}
</script>

<style scoped>
.actions {
  text-align: right;
}
.note {
  padding: 10px 0;
  border-bottom: 1px solid rgba(1,1,1,0.1);
}
.note .body {
  white-space: pre-line;
  line-height: 1.3em;
}
.note .time {
  color: grey;
  line-height: 26px;
}
.star-icon {
  width: 24px;
  height: 24px;
  opacity: 0.5;
}
.star-icon:hover {
  opacity: 1;
}
</style>