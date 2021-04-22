<template>
  <article class='card' data-test-id='promt-card'>
    <img :src="source"
         @error="setAltImage"
         data-test-id="promt-card__image"
         class="card__image"
         alt="Card photo">
    <div class="card__info">
      <p class="card__name"
         data-test-id="promt-card__name">{{ name }}</p>
      <p class="card__contacts"
         data-test-id="promt-card__contacts">{{ contactInfo }}</p>
    </div>
  </article>
</template>
<script lang="ts">
import Vue from 'vue';
// FIXME: It must come from outside
import defaultImage from '@/assets/default-picture2.png';

export default Vue.extend({
  name: 'PromtCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: false,
      default: '',
    },
    image: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      source: '',
    };
  },
  methods: {
    setAltImage(event: Event) {
      this.source = defaultImage;
    },
  },
  created() {
    this.source = this.image || defaultImage;
  },
});
</script>
<style lang="scss">
  .card {
    display: flex;

    &__image {
      height: 40px;
      margin-right: .5rem;
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      p {
        margin: unset;
      }
    }
    &__name {
      font-size: 14px;
    }
    &__contacts {
      font-size: 12px;
      color: #98999A;
    }
  }
</style>
