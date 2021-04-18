<template>
   <label>
      <img src="../../assets/search.svg" class="search__icon">
      <input type="text"
             :value="text"
             data-test-id="search__field"
             @input="searchUser"
             placeholder="Write user name">
   </label>
</template>
<script lang="ts">
/* eslint-disable func-names */
import Vue from 'vue';
import debounce from 'lodash/debounce';

export default Vue.extend({
  name: 'SearchField',
  props: {
    searchValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      text: null,
    };
  },
  methods: {
    searchUser: debounce(function (event): void {
      this.text = event.target.value;
      this.$emit('search', event.target.value);
    }, 500),
  },

  mounted() {
    this.text = this.$props.searchValue;
  },
});
</script>
<style lang="scss" scoped>
  label {
    display: flex;
    padding: 1rem;

    :first-child {
      margin-right: 1rem;
    }

    input, input:focus {
      border: unset;
      outline: unset;
    }
  }
</style>
