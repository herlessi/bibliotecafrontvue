import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSimpleAlert from "vue-simple-alert";
import axios from 'axios'
import vuetify from './plugins/vuetify'
// import { VuejsDatatableFactory } from 'vuejs-datatable';

// Vue.use( VuejsDatatableFactory );

Vue.config.productionTip = false

axios.defaults.baseURL = (process.env.NODE_ENV == 'development') ? 
  'http://localhost:3000' : 'https://apifichadigital.economysoftware.com.br'

Vue.prototype.$http = axios

Vue.use(VueSimpleAlert)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
