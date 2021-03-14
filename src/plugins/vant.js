import Vue from 'vue'
import {
  Button,
  Form,
  Field,
  Icon,
  Toast,
  Notify,
  Dialog,
  CellGroup,
  Tabbar, TabbarItem
} from 'vant'

Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(Icon)
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
Vue.use(Dialog)
Vue.use(CellGroup)
Vue.use(Tabbar)
Vue.use(TabbarItem)
