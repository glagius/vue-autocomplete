import Vue from 'vue';
import { loader, imagesUrl, usersUrl } from '@/services/api-requests';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App, {
    props: {
      dataLoader: () => loader(usersUrl),
      imagesLoader: () => loader(imagesUrl),
    },
  }),
}).$mount('#app');
