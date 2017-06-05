import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Copyright from '@/components/Copyright'
import Faq from '@/components/Faq'
import Partnerships from '@/components/Partnerships'
import Privacy from '@/components/Privacy'
import RaceDirectors from '@/components/RaceDirectors'
import Team from '@/components/Team'
import Terms from '@/components/Terms'
import UserProfile from '@/components/UserProfile'
import UserEdit from '@/components/UserEdit'
import Login from '@/components/Login'
import Payment from '@/components/Payment'
import RaceSearch from '@/components/RaceSearch'

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
      path: '/contact',
      name: 'Contact',
      component: Contact
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
      path: '/partnerships',
      name: 'Partnerships',
      component: Partnerships
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
      path: '/app/search',
      name: 'RaceSearch',
      component: RaceSearch
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
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
