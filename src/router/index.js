import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Persional from '@/components/Persional'
import BlogManager from '@/views/BlogManager'
import CommentManager from '@/views/CommentManager'
import InfoManager from '@/views/InfoManager'
import UpdatePass from '@/views/UPdatePass'
import BlogEditor from '@/views/BlogEditor'
import BlogDetail from '@/views/BlogDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
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
    },
    {
      path: '/commentManager',
      name: 'commentManager',
      component: CommentManager
    },
    {
      path: '/infoManager',
      name: 'infoManager',
      component: InfoManager
    },
    {
      path: '/updatePass',
      name: 'udpatePass',
      component: UpdatePass
    },
    {
      path: '/blogEditor',
      name: 'blogEditor',
      component: BlogEditor
    },
    {
      path: '/blogDetail',
      name: 'blogDetail',
      component: BlogDetail
    }
  ]
})

