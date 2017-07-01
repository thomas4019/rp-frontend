<template>
 <section>
    <div class="race-table">
      <div class="row no-gutters" id="header">
        <div class="col">Type</div>
        <div class="col-lg-3">Race</div>
        <div class="col-lg-2">Date</div>
        <div class="col-lg-2">Location</div>
        <div class="col-lg-2">Website</div>
        <div class="col"></div>
      </div>
      <div class="row no-gutters" v-for="race in races" v-bind:key="race.id">
        <div class="col distance">
          <span v-for="course in race.courses" :class="{ 'chosen': isSelectedDistance(race, course) }" v-bind:key="course.id">
            {{course.distance}}
          </span>
        </div>
        <div class="col-lg-3 race-name">{{race.name}}</div>
        <div class="col-lg-2 datetime">{{race.datetime | formatDate }}</div>
        <div class="col-lg-2 location">{{race.location.city}}, {{race.location.state}}</div>
        <div class="col-lg-2 website">
          <a target="_blank" :href="race.website"><em>{{race.website | formatURL }}</em></a>
        </div>
        <div class="col actions">
          <RaceActions :race="race"></RaceActions>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import RaceActions from '@/components/RaceActions'

export default {
  name: 'race-table',
  components: {
    RaceActions
  },
  methods: {
    isSelectedDistance (race, course) {
      var matching = this.$store.state.user.race_signups.filter((rs) => rs.race_id === race._id)
      if (!matching.length) {
        return false
      }
      return course.distance === matching[0].distance
    },
  },
  props: ['races']
}
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})
Vue.filter('formatURL', function (value) {
  if (value) {
    var t = value.replace(/(^\w+:|^)\/\//, '')
    if (t.startsWith('www.')) {
      t = t.replace('www.', '')
    }
    if (t.endsWith('/')) {
      t = t.slice(0, -1)
    }
    return t
  }
})
</script>

<style scoped>
.distance span {
  padding-left: 5px;
}
.race-table{
  text-align: left;
  font-size: 14px;
  color: #D6D6D6;
}
#header {
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.15);
	background: #323237;
  color: #FFFFFF;
  font-weight: 300;
  line-height: 19px;
}
.race-table #header div {
  padding: 5px 0px 7px 0px;
}
#header.row {
  margin: 15px 0px 0px 0px;
}
.row {
  margin: 23px 0px 0px 0px;
  padding: 0px 10px 0px 10px;
  line-height: 19px;
  font-weight: 900;
}
.distance .chosen {
  color: #0DFFAE;
}
.race-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.website a {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
