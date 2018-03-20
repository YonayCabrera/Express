import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ],
  mode: 'history'
})
