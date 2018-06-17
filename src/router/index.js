import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Persional from '@/components/Persional'
import BlogManager from '@/views/BlogManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/persional',
      name: 'persional',
      component: Persional
    },
    {
      path: '/blogManager',
      name: 'blogManager',
      component: BlogManager
    }
  ]
})
