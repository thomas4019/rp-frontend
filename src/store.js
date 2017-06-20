import Vue from 'vue'
import Vuex from 'vuex'
import rp from './rp'
import toastr from 'toastr'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLoggedIn: false,
    token: '',
    photo: '',
    user: {},
    favorites: {},
    filters: {
      'location.state': null,
      'datetime': {
        '$gte': new Date().toISOString(),
        '$lte': '2100'
      }
    },
    search_text: '',
    selectedRace: {},
    selectionLocation: {},
    suggestedRaces: [],
    homeSearchMode: 'map',
  },
  mutations: {
    login (state, result) {
      state.isLoggedIn = true
      state.token = result.token
      localStorage.token = result.token
    },
    setIsLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    updateUser (state, user) {
      state.user = user
      if (state.user.facebook_id) {
        state.photo = 'https://graph.facebook.com/' + state.user.facebook_id +
                      '/picture?type=large&w‌​idth=720&height=720'
      } else {
        state.photo = '/static/imgs/profiles/default-user-avatar.png'
      }
      state.favorites = {}
      if (state.user.favorites) {
        state.user.favorites.forEach(function (id) {
          state.favorites[id] = true
        })
      } else {
        state.user.favorites = []
      }
      if (!state.user.address) {
        state.user.address = { coordinates: {} }
      }
    },
    setSuggestedRaces (state, races) {
      state.suggestedRaces = races
    },
    logout (state) {
      state.isLoggedIn = false
      state.token
      state.user = {}
      delete localStorage.token
    },
    updateFilters (state, filters) {
      state.filters = filters
    },
    search (state, text) {
      state.search_text = text
    },
    filter (state, filter) {
      Object.assign(state.filters, filter)
    },
    favorite (state, id) {
      Vue.set(state.favorites, id, true)
      var changes = {
        '$push': {
          'favorites': id
        }
      }
      rp.post('users/' + state.user._id + '/update', changes)
    },
    unfavorite (state, id) {
      Vue.set(state.favorites, id, false)
      var changes = {
        '$pop': {
          'favorites': id
        }
      }
      rp.post('users/' + state.user._id + '/update', changes)
    },
    updateHomeSearchMode (state, mode) {
      state.homeSearchMode = mode
    },
    updateHomeSearchText (state, text) {
      state.homeSearchText = text
    },
    selectRace (state, race) {
      state.selectedRace = race
    }
  },
  getters: {
    isUserLoaded (state) {
      return !!state.user.email
    },
    getUserId (state) {
      return state.user._id
    }
  },
  actions: {
    loadUser (context) {
      context.commit('setIsLoading', true)
      rp.get('user/me')
        .then((user) => {
          context.commit('updateUser', user)

          if (user.address && user.address.coordinates) {
            var lat = user.address.coordinates.lat
            var lng = user.address.coordinates.lng
            rp.get('nearby_races?limit=8&lat=' + lat + '&lng=' + lng)
              .then((races) => {
                context.commit('setSuggestedRaces', races)
              })
          }
          context.commit('setIsLoading', false)
        }, (err) => {
          console.error(err)
          context.commit('setIsLoading', false)
        })
    },
    registerForRace (context, data) {
      var raceSignup = {
        'race_id': data.race._id,
        'distance': data.distance,
        'status': 'pending'
      }
      rp.post('race_signup', raceSignup)
        .then(function (result) {
          toastr.info('Registration requested successfully')
          context.dispatch('loadUser')
        }, function (err) {
          toastr.error(err.error)
        })
    },
    cancelRegistration (context, reason) {
      var matching = context.state.user.race_signups.filter((rs) => rs.race_id === context.state.selectedRace._id)
      console.log(context.state)
      var signupId = matching[0]._id
      var data = {
        '$set': { 'status': 'canceled', 'cancellation_reason': reason }
      }
      rp.post('race_signup/' + signupId + '/update', data)
        .then(function (result) {
          context.dispatch('loadUser')
        })
    }
  }
})
