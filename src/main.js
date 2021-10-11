import Vue from 'vue'
import App from './App.vue'
//引入路由
import VueRouter from 'vue-router'
//引入路由器
import router from './router/index'
//引入axios
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(VueRouter) // vue实例使用路由
Vue.prototype.$http = axios // 在vue原型对象上挂载axios实例
axios.defaults.baseURL = 'http://10.8.236.179:8000'


new Vue({
  render: h => h(App),
  router,//使用路由器
  // $mount和Vue的el配置项一样的作用
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
