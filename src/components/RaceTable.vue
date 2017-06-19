<template>
 <section id="upcoming-races" class="container">
    <RaceRegister ref="reg" />
    <RaceCancel ref="cancel" />
    <table class="race-table">
      <tr>
        <th style="width: 100px;">Distances</th>
        <th style="width: 250px;" class="race-name">Race</th>
        <th style="width: 100px;">Date</th>
        <th style="width: 150px;">Location</th>
        <th style="width: 200px;">Website</th> 
        <th>Actions</th>
      </tr>
      <tr v-for="race in races">
        <td class="distance">
          <span v-for="course in race.courses" :class="{ 'chosen': isSelectedDistance(race, course) }">
            {{course.distance}}
          </span>
        </td>
        <td class="race-name"><span>{{race.name}}</span></td>
        <td>{{race.datetime | formatDate }}</td>
        <td>{{race.location.city}}, {{race.location.state}}</td>
        <td class="website">
          <a target="_blank" :href="race.website"><em>{{race.website}}</em></a>
        </td>
        <td class="actions">
          <button v-if="isRegistered(race)" class="hollow" @click="cancel(race)">Cancel</button>
          <button v-else-if="isAvailable(race)" class="hollow" @click="register(race)">Register</button>
          <button v-else class="hollow" disabled="disabled">Finished</button>
          <i @click="toggleFavorite(race._id)" style="position:relative;top:5px;" class="favorite fa fa-2x" :class="{  'fa-heart' : isFavorite(race), 'fa-heart-o': !isFavorite(race) }" aria-hidden="true"></i>
          <!--<a style="position:relative;top:4px;" href="https://www.facebook.com/sharer/sharer.php?u=example.org&p[summary]=YOUR_DESCRIPTION">
            <i class="favorite fa fa-share-alt fa-2x" aria-hidden="true"></i>
          </a>-->
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import RaceRegister from '@/components/RaceRegister'
import RaceCancel from '@/components/RaceCancel'

export default {
  name: 'race-table',
  components: {
    RaceRegister,
    RaceCancel
  },
  methods: {
    isRegistered (race) {
      var ids = this.$store.state.user.race_listings.map((r) => r._id)
      return ids.includes(race._id)
    },
    isFavorite (race) {
      return this.$store.state.favorites[race._id]
    },
    isAvailable (race) {
      return (race.datetime > new Date().toISOString())
    },
    isSelectedDistance (race, course) {
      var matching = this.$store.state.user.race_signups.filter((rs) => rs.race_id === race._id)
      if (!matching.length) {
        return false
      }
      return course.distance === matching[0].distance
    },
    toggleFavorite (_id) {
      if (this.$store.state.favorites[_id]) {
        this.$store.commit('unfavorite', _id)
      } else {
        this.$store.commit('favorite', _id)
      }
    },
    register (race) {
      this.$refs.reg.show()
      this.$store.commit('selectRace', race)
    },
    cancel (race) {
      this.$refs.cancel.show()
    },
    prev () {
      if (this.page > 0) {
        this.page--
        this.update()
      }
    },
    next () {
      if (this.page < this.page_count - 1) {
        this.page++
        this.update()
      }
    }
  },
  props: ['races'],
  data () {
    return {
      page: 0,
      page_count: 1,
      limit: 10,
      prev_search: '',
    }
  }
}
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})
</script>

<style scoped>
.race-table {
	width: 100%;
  table-layout: fixed;
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
.distance .chosen {
  color: #0DFFAE;
}
.race-name {
}
.website {
  width: 200px;
}
.website a {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.favorite {
  color: #0DFFAE;
}
.actions > * {
  margin-right: 8px;
}
</style>
