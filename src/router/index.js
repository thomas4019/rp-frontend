import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Copyright from '@/components/Copyright'
import Faq from '@/components/Faq'
import Privacy from '@/components/Privacy'
import RaceDirectors from '@/components/RaceDirectors'
import Team from '@/components/Team'
import Terms from '@/components/Terms'
import UserProfile from '@/components/UserProfile'
import UserEdit from '@/components/UserEdit'
import Login from '@/components/Login'
import Payment from '@/components/Payment'

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
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/copyright',
      name: 'Copyright',
      component: Copyright
    },
    {
      path: '/faq',
      name: 'Faq',
      component: Faq
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/app/profile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/race-directors',
      name: 'RaceDirectors',
      component: RaceDirectors
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/app/useredit',
      name: 'UserEdit',
      component: UserEdit
    }
  ]
})
