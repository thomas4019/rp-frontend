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
import NotFoundComponent from '@/components/NotFoundComponent'
import StyleGuide from '@/components/StyleGuide'

Vue.use(Router)

const store = require('@/store').default

function ensureLogin (to, from, next) {
  function proceed () {
    if (!store.getters.isUserLoaded) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }

  // If store is actively loading a user, wait until it isn't loading anymore.
  // This prevents users from getting logged out when they refresh the page.
  if (store.state.isLoading) {
    store.watch(
      (state) => state.isLoading,
      (value) => {
        if (value === false) {
          proceed()
        }
      }
    )
  } else {
    proceed()
  }
}

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
      component: UserProfile,
      beforeEnter: ensureLogin
    },
    {
      path: '/app/search',
      name: 'RaceSearch',
      component: RaceSearch,
      beforeEnter: ensureLogin
    },
    {
      path: '/app/payment',
      name: 'Payment',
      component: Payment,
      beforeEnter: ensureLogin
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
      path: '/styleguide',
      name: 'StyleGuide',
      component: StyleGuide
    },
    {
      path: '/app/useredit',
      name: 'UserEdit',
      component: UserEdit,
      beforeEnter: ensureLogin
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    return {x: 0, y: 0}
  }
})
