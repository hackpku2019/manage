import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import Login from './views/Login'
import Notice from './views/Notice'
import User from './views/User'
import Achievement from './views/Achievement'
import Team from './views/Team'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/achievement',
      name: 'achievement',
      component: Achievement
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
