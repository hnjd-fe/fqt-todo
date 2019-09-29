
require( './index.less' )

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

Vue.use(VueAxios, axios)
//Vue.axios.defaults.withCredentials = true

console.log( 'code from vue', Date.now() );

new Vue({
  render: h => h(App)
}).$mount( '#app' );
