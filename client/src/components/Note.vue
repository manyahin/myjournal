<template>
  <div class="note">
    <div class="header pure-g">
      <div class="time pure-u-1-2">
        <router-link :to="{ name: 'note', params: { id: note.id } }">
          <!-- TODO: here is error in moment -->
          {{ note.created_at | moment('HH:mm') }}
        </router-link>
        </div>
      <div class="actions pure-u-1-2">
        <img @click="favorite" :src="starIconSrc" :alt="!note.favorite ? 'star' : 'unstar'"
          class="star-icon" :class="{opacity: !note.favorite}">
      </div>
    </div>
    <div class="body">{{ note.body }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    note: {
      type: Object
    }
  },
  created () {
    // preload star icons
    const imgs = ['/static/star.png', '/static/star_filled.png']
    imgs.forEach(src => this.preLoadImage(src))
  },
  computed: {
    starIconSrc () {
      return '/static/' + (this.note.favorite ? 'star_filled.png' : 'star.png')
    }
  },
  methods: {
    favorite () {
      this.note.favorite = !this.note.favorite
      axios.patch('Notes/' + this.note.id, { favorite: this.note.favorite })
    },
    preLoadImage (src) {
      let img = new Image()
      img.src = src
    }
  }
}
</script>

<style scoped lang="scss">
.note {
  padding: 8px 0;
  border-bottom: 1px solid rgba(1,1,1,0.1);

  .header {
    .time {
      color: grey;
      line-height: 26px;
      font-size: 20px;
      font-weight: 100;
    }

    .actions {
      text-align: right;

      .star-icon {
        width: 24px;
        height: 24px;
        cursor: pointer;

        &.opacity {
          opacity: 0.2;
        }
      }
    }
  }
  .body {
    white-space: pre-line;
    line-height: 1.3em;
  }
}
</style>
