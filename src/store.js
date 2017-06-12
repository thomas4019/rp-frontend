import Vuex from 'vuex'
import rp from './rp'
export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: '',
    photo: '',
    user: {},
    favorites: {},
    filters: {},
    search_text: '',
    selectedRace: {},
    selectionLocation: {},
  },
  mutations: {
    login (state, result) {
      state.isLoggedIn = true
      state.token = result.token
      localStorage.token = result.token
    },
    loadUser (state) {
      rp.get('user/me')
        .then((result) => {
          state.user = result
          if (state.user.facebook_id) {
            state.photo = 'https://graph.facebook.com/' + state.user.facebook_id +
                          '/picture?type=large&w‌​idth=720&height=720'
          } else {
            state.photo = '/static/imgs/profiles/default-user-avatar.png'
          }
          state.favorites = {
            '100': true,
            '101': true,
            '102': true,
          }
        }, (err) => {
          console.error(err)
        })
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
      console.log(text)
      state.search_text = text
    },
    favorite (state, id) {
      state.favorites[id] = true
    },
    unfavorite (state, id) {
      delete state.favorites[id]
    },
    selectRace (state, race) {
      state.selectedRace = race
    }
  },
  actions: {
    getSuggestedRaces (context) {
      /* var user = context.state.user
      console.log(context.state)
      if (!user) {
        return []
      }
      console.log(123)
      console.log(context.$store.state.user) */
      // var lat = user.address.coordinates.lat
      // var lng = user.address.coordinates.lng
      // return rp.get('nearby_races?limit=8&lat=' + lat + '&lng=' + lng)
    }
  }
})
