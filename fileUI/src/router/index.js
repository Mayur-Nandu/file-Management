import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import signup from '@/components/signup'
import navbar from '@/components/navbar'
import user from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/nvavbar',
      name: 'navbar',
      component: navbar
    },
    {
      path: '/user',
      name: 'user',
      component: user
    }
  ]
})
