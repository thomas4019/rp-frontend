<template>
 <section id="upcoming-races" class="container">
   {{search_text}}
    <RaceRegister ref="reg" />
    <table class="race-table">
      <tr>
        <th>Type</th>
        <th>Race</th>
        <th>Date</th>
        <th>Location</th>
        <th>Website</th> 
        <th>Actions</th>
      </tr>
      <tr v-for="race in races">
        <td class="distance">{{race.distance | formatRaceDistance}}</td>
        <td class="race-name"><span>{{race.name}}</span></td>
        <td>{{race.datetime | formatDate }}</td>
        <td>{{race.location.city}}, {{race.location.state}}</td>
        <td class="website">
          <a target="_blank" :href="race.website"><em>{{race.website}}</em></a>
        </td>
        <td>
          <button class="hollow" @click="register(race)">Register</button>
          <i @click="toggleFavorite(race._id)" class="favorite fa fa-2x" :class="{  'fa-heart' : race.is_favorite, 'fa-heart-o': !race.is_favorite }" aria-hidden="true"></i>
          <a href="https://www.facebook.com/sharer/sharer.php?u=example.org&p[summary]=YOUR_DESCRIPTION">
            <i class="favorite fa fa-share-alt fa-2x" aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import Vue from 'vue'
import rp from '../rp'
import moment from 'moment'
import RaceRegister from '@/components/RaceRegister'

export default {
  name: 'race-list',
  components: {
    RaceRegister
  },
  methods: {
    update () {
      var query = {
        status: 'visible',
        $and: [],
        datetime: {
          $nin: ['', 'TBD']
        }
      }
      this.$store.state.search_text.split(' ').forEach(function (word) {
        query['$and'].push({'name': {'$regex': word, '$options': 'i'}})
      })
      var orderby = {
        'datetime': 1
      }
      rp.get('race?limit=10&query=' + JSON.stringify(query) + '&orderby=' + JSON.stringify(orderby))
        .then((races) => {
          this.races = races
          this.races.forEach((race) => {
            race.is_favorite = this.$store.state.favorites[race._id]
          })
        })
    },
    toggleFavorite (_id) {
      if (this.$store.state.favorites[_id]) {
        this.$store.commit('unfavorite', _id)
      } else {
        this.$store.commit('favorite', _id)
      }
      this.update()
    },
    register (race) {
      this.$refs.reg.show()
      this.$store.commit('selectRace', race)
    }
  },
  computed: {
    search_text () {
      this.update()
      return this.$store.state.search_text
    }
  },
  mounted () {
    this.update()
  },
  data () {
    return {
      races: []
    }
  }
}
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})
Vue.filter('formatRaceDistance', function (value) {
  return rp.formatRaceDistance(value)
})
</script>

<style scoped>
.race-table {
	width: 100%;
}
.race-table th {
	background: #323237;
	padding: 8px 15px;
	font-weight: lighter;
}
.race-table td {
	color: #F7F7F7;
	padding: 10px;
	border-bottom: 0.5px solid #323237;
}
.race-table .button {
	padding: 5px;
	width: 100px;
	font-size: 12px;
}
.distance {
  max-width: 70px;
}
.race-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  column-width: 150px;
}
.website a {
  display: block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.favorite {
  color: #0DFFAE;
}
</style>
