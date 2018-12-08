import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import FindRows from '../components/FindRows'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/findrows',
      name: 'FindRows',
      component: FindRows
    },
    {
      path: '/sql',
      name: 'sql',
      component: FindRows
    }
  ]
})
