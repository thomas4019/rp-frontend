import Vue from 'vue'
import Vuex from 'vuex'
import rp from './rp'

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
        '$gte': '2000',
        '$lte': '2100'
      }
    },
    search_text: '',
    selectedRace: {},
    selectionLocation: {},
    suggestedRaces: [],
    homeSearchMode: 'list',
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
      state.user.favorites.forEach(function (id) {
        state.favorites[id] = true
      })
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

          var lat = user.address.coordinates.lat
          var lng = user.address.coordinates.lng
          rp.get('nearby_races?limit=8&lat=' + lat + '&lng=' + lng)
            .then((races) => {
              context.commit('setSuggestedRaces', races)
            })
          context.commit('setIsLoading', false)
        }, (err) => {
          console.error(err)
          context.commit('setIsLoading', false)
        })
    }
  }
})
