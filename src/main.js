import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueCookies from 'vue-cookies'
import vueHeadful from 'vue-headful';

//Assign to Vue instance
Vue.use(VueCookies);
VueCookies.config('365d') //Days

Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
}).$mount('#app')
