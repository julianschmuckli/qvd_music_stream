import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
}).$mount('#app')
