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
      text: this.searchValue,
    };
  },
  methods: {
    searchUser: debounce(function (event): void {
      this.$emit('search', event.target.value);
    }, 500),
  },
  watch: {
    searchValue() {
      this.text = this.searchValue;
    },
  },
});
</script>
<style lang="scss" scoped>
  label {
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid #262626;

    :first-child {
      margin-right: 1rem;
    }

    input, input:focus {
      border: unset;
      outline: unset;
    }
  }
</style>
