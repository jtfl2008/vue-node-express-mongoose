import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let Home = resolve => require(['@/pages/Home'], resolve)
let Detail = resolve => require(['@/pages/Detail'], resolve)
let Login = resolve => require(['@/pages/Login'], resolve)
let Registe = resolve => require(['@/pages/Registe'], resolve)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/registe',
      name: 'Registe',
      component: Registe
    }
  ]
})
