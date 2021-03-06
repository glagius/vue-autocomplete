<template>
  <fieldset>
    <search-field :searchValue="searchText"
                  @search="getUsers"></search-field>
    <div>
      <ul v-if="loaded" class="container"
          data-test-id="card__container">
        <li v-for="user in users"
            :key="`${user.id}-${user.name}`"
            @click="selectUser(user)">
          <promt-card :name="user.name"
                      :contactInfo="user.email"
                      :image="user.avatar"></promt-card>
        </li>
      </ul>
      <spinner v-show="loading"></spinner>
      <p v-if="failed"
            class='error'>Data request failed</p>
      <!-- loader if LOADING -->
      <!-- loader if FAILED -->
    </div>
  </fieldset>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import PromtCard from '@/components/PromtCard/PromtCard.vue';
import SearchField from '@/components/SearchField/SearchField.vue';
import Spinner from '@/components/Spinner/Spinner.vue';
import { SearchState, UserAvatar, UserInfo } from './models';

export default Vue.extend({
  name: 'App',
  components: { SearchField, PromtCard, Spinner },
  props: {
    dataLoader: {
      type: Function as PropType<() => Promise<UserInfo[]>>,
      required: true,
    },
    imagesLoader: {
      type: Function as PropType<() => Promise<UserAvatar[]>>,
      required: true,
    },
  },
  data() {
    return {
      status: SearchState.idle,
      user: {} as UserInfo,
      searchText: '',
      users: [] as UserInfo[],
      error: null,
    };
  },
  methods: {
    async getUsers(text: string) {
      this.searchText = text;
      this.setStatus(SearchState.loading);
      try {
        const data: UserInfo[] = await this.dataLoader();
        const users = data.filter((user: UserInfo) => user.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()));
        const images = await this.imagesLoader();
        const usersWithAvatars = users.map((user) => {
          const avatar = images.find((image) => image.id === user.id) || {};
          return { ...user, avatar: avatar.url || null };
        });
        this.users = usersWithAvatars;
      } catch (err) {
        this.error = err;
        setTimeout(() => { this.error = null; }, 2000);
      }
    },
    setStatus(nextStatus: SearchState) {
      this.status = nextStatus;
    },
    selectUser(user: UserInfo) {
      this.$data.searchText = user.name;
      this.user = user;
      this.users = [];
    },
  },
  watch: {
    users(next) {
      if (next.length === 0) {
        this.setStatus(SearchState.idle);
      } else {
        this.setStatus(SearchState.loaded);
      }
    },
    error(next) {
      if (next) {
        this.setStatus(SearchState.failed);
      } else {
        this.setStatus(SearchState.idle);
      }
    },
    user(next) {
      if (next) {
        this.$emit('selected', this.user);
      }
    },
  },
  computed: {
    idle() {
      return this.$data.status === SearchState.idle;
    },
    loading() {
      return this.$data.status === SearchState.loading;
    },
    loaded() {
      return this.$data.status === SearchState.loaded;
    },
    failed() {
      return this.$data.status === SearchState.failed;
    },
  },
});
</script>

<style lang="scss">
fieldset {
  max-width: 21.5rem;
  padding: unset;
  outline: unset;
  border: unset;
  background-color: white;
  border-radius: .5rem;

  .container {
    max-height: 14rem;
    overflow-y: auto;
    margin: unset;
    padding: 1rem;

    & > *:not(:last-child) {
      margin-bottom: 1rem;
    }
    & > *:hover {
      box-shadow: 0px 0px 10px 6px rgba(34, 60, 80, 0.2);
      cursor: pointer;
    }
  }
}
li {
  list-style: none;
}
.error {
    text-align: center;
    color: red;
    font-size: 1.5rem;
}
</style>
