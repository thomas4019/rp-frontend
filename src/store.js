import Vuex from 'vuex'
import rp from './rp'
export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: '',
    photo: '',
    user: {},
    filters: {},
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
            state.photo = 'imgs/profiles/default-user-avatar.png'
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
      state.search_text = text
    }
  },
  actions: {
    getSuggestedRaces (context) {
      var user = context.state.user
      console.log(context.state)
      if (!user) {
        return []
      }
      console.log(123)
      console.log(context.$store.state.user)
      // var lat = user.address.coordinates.lat
      // var lng = user.address.coordinates.lng
      // return rp.get('nearby_races?limit=8&lat=' + lat + '&lng=' + lng)
    }
  }
})
