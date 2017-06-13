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
    suggestedRaces: [],
  },
  mutations: {
    login (state, result) {
      state.isLoggedIn = true
      state.token = result.token
      localStorage.token = result.token
    },
    updateUser (state, user) {
      state.user = user
      if (state.user.facebook_id) {
        state.photo = 'https://graph.facebook.com/' + state.user.facebook_id +
                      '/picture?type=large&w‌​idth=720&height=720'
      } else {
        state.photo = 'imgs/profiles/default-user-avatar.png'
      }
      state.favorites = {
        '100': true,
        '101': true,
        '102': true,
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
    favorite (state, id) {
      state.favorites[id] = true
      var changes = {
        '$push': {
          'favorites': id
        }
      }
      rp.post('users/' + state.user._id + '/update', changes)
    },
    unfavorite (state, id) {
      delete state.favorites[id]
    },
    selectRace (state, race) {
      state.selectedRace = race
    }
  },
  actions: {
    loadUser (context) {
      rp.get('user/me')
        .then((user) => {
          context.commit('updateUser', user)

          var lat = user.address.coordinates.lat
          var lng = user.address.coordinates.lng
          rp.get('nearby_races?limit=8&lat=' + lat + '&lng=' + lng)
            .then((races) => {
              context.commit('setSuggestedRaces', races)
            })
        }, (err) => {
          console.error(err)
        })
    }
  }
})
