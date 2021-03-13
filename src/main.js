import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'

// 导入全局样式表
import './assets/css/global.css'

// 导入移动端适配初始样式
import './assets/css/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
