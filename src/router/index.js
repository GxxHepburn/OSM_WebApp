import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../components/Login.vue')

const Home = () => import('../components/Home.vue')

const OrderHome = () => import('../components/order/OrderHome.vue')

const MenuHome = () => import('../components/menu/MenuHome.vue')

const MerHome = () => import('../components/mer/MerHome.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/static/login' },
  {
    path: '/static/login',
    component: Login
  },
  {
    path: '/static/home',
    component: Home,
    redirect: '/static/orderHome',
    children: [
      {
        path: '/static/orderHome',
        component: OrderHome
      },
      {
        path: '/static/merHome',
        component: MerHome
      },
      {
        path: '/static/menuHome',
        component: MenuHome
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
