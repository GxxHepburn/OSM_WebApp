import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'

// 导入全局样式表
import './assets/css/global.css'

// 导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'
axios.defaults.baseURL = 'https://www.donghuastar.com/'
axios.interceptors.request.use(config => {
  if (config.headers.Authorization !== undefined && config.headers.Authorization !== '') {
    return config
  }

  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
