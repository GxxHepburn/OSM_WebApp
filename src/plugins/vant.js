import Vue from 'vue'
import {
  Button,
  Form,
  Field,
  Icon,
  Toast,
  Notify
} from 'vant'

Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(Icon)
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
