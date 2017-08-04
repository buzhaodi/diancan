// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from '../node_modules/axios'
import VueAxios from '../node_modules/vue-axios'

Vue.use(VueAxios, axios, router)
axios.defaults.withCredentials = true
Vue.config.productionTip = false
// 定义跟网站常量
Vue.prototype.SERVERDOMIAN = 'http://192.168.1.91:999'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
// router.push('/goods')
