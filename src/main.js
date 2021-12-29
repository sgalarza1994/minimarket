import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './plugins';
import Loading from 'vue-loading-overlay';
import adicional from '@/plugins/adicional';
import 'vue-loading-overlay/dist/vue-loading.css';
import Notifications from 'vue-notification';
import Vuelidate from 'vuelidate';
Vue.config.productionTip = false


Vue.use(Loading);
Vue.use(Notifications);
Vue.use(adicional);
   
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
