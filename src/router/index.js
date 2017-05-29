import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Copyright from '@/components/Copyright'
import UserProfile from '@/components/UserProfile'
import UserEdit from '@/components/UserEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/copyright',
      name: 'Copyright',
      component: Copyright
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/useredit',
      name: 'UserEdit',
      component: UserEdit
    }
  ]
})
