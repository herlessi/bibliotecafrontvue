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


//SOCKET.IO
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client";
Vue.use(
  new VueSocketIO({
      debug: true,
      connection: SocketIO("http://localhost:3001" + '/servicosocket', { query: {}, autoConnect: false }),
      vuex: {
          store,
          actionPrefix: "SOCKET_",
          mutationPrefix: "SOCKET_",
      },
      // options: [{ transports: ["websocket"] }],
  })
);


new Vue({
  router,
  store,
  vuetify,
  sockets: {
      connect: function() {
          alert('conectado')
      },
      disconnect: function() {
          alert('nao conectado')
      },
  },
  render: h => h(App)
}).$mount('#app')
