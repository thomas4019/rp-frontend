import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Copyright from '@/components/Copyright'
import Partnerships from '@/components/Partnerships'
import Privacy from '@/components/Privacy'
import RaceDirectors from '@/components/RaceDirectors'
import RaceDirectorsFaq from '@/components/RaceDirectorsFaq'
import RaceDirectorsSupport from '@/components/RaceDirectorsSupport'
import Runners from '@/components/Runners'
import RunnersFaq from '@/components/RunnersFaq'
import RunnersSupport from '@/components/RunnersSupport'
import Terms from '@/components/Terms'
import UserProfile from '@/components/UserProfile'
import UserEdit from '@/components/UserEdit'
import Login from '@/components/Login'
import Payment from '@/components/Payment'
import RaceSearch from '@/components/RaceSearch'
import RaceProfile from '@/components/RaceProfile'
import RaceEditor from '@/components/RaceEditor'
import NotFoundComponent from '@/components/NotFoundComponent'
import StyleGuide from '@/components/StyleGuide'
import Why from '@/components/Why'

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
      path: '/copyright',
      name: 'Copyright',
      component: Copyright
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
      path: '/app/race/:route_id/',
      name: 'RaceProfile',
      component: RaceProfile,
      beforeEnter: ensureLogin
    },
    {
      path: '/app/races',
      name: 'BulkRaceEditor',
      component: RaceEditor,
      beforeEnter: ensureLogin
    },
    {
      path: '/app/race/:route_id/:slug',
      name: 'RaceProfileSlug',
      component: RaceProfile,
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
      path: '/race-directors-faq',
      name: 'RaceDirectorsFaq',
      component: RaceDirectorsFaq
    },
    {
      path: '/race-directors-support',
      name: 'RaceDirectorsSupport',
      component: RaceDirectorsSupport
    },
    {
      path: '/runners',
      name: 'Runners',
      component: Runners
    },
    {
      path: '/runners-faq',
      name: 'RunnersFaq',
      component: RunnersFaq
    },
    {
      path: '/runners-support',
      name: 'RunnersSupport',
      component: RunnersSupport
    },
    {
      path: '/payment',
      name: 'Payment 2',
      component: Payment
    },
    {
      path: '/why',
      name: 'Why',
      component: Why
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
