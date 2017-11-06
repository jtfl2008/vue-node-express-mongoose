import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let Home = resolve => require(['@/pages/Home'], resolve)
let Movies = resolve => require(['@/pages/Movies'], resolve)
let Books = resolve => require(['@/pages/Books'], resolve)
let Musics = resolve => require(['@/pages/Musics'], resolve)
let Detail = resolve => require(['@/pages/Detail'], resolve)
let Login = resolve => require(['@/pages/Login'], resolve)
let Registe = resolve => require(['@/pages/Registe'], resolve)
export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'Movies' },
    children: [{
      path: 'movies',
      name: 'Movies',
      component: Movies
    }, {
      path: 'books',
      name: 'Books',
      component: Books
    }, {
      path: 'musics',
      name: 'Musics',
      component: Musics
    }, {
      path: 'detail/:id',
      name: 'Detail',
      component: Detail
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/registe',
    name: 'Registe',
    component: Registe
  }]
})
