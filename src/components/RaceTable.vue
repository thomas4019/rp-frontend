<template>
 <section>
    <div class="race-table">
      <div class="wrapper" id="header">
        <div class="wrapper text distance">Distances</div>
        <div class="wrapper text race-name">Race</div>
        <div class="wrapper text datetime">Date</div>
        <div class="wrapper text location">Location</div>
        <div class="wrapper text website">Website</div>
        <div class="wrapper text actions">Actions</div>
      </div>
      <div class="wrapper tbrow" v-for="race in races" v-bind:key="race.id">
        <div class="wrapper text distance">
          <span v-for="course in race.courses" :class="{ 'chosen': isSelectedDistance(race, course) }" v-bind:key="course.id">
            {{course.distance}}
          </span>
        </div>
        <div class="wrapper text race-name">{{race.name}}</div>
        <div class="wrapper text datetime">{{race.datetime | formatDate }}</div>
        <div class="wrapper text location">{{race.location.city}}, {{race.location.state}}</div>
        <div class="wrapper text website">
          <a target="_blank" :href="race.website"><em>{{race.website | formatURL }}</em></a>
        </div>
        <div class="wrapper text actions">
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
    return value.replace(/(^\w+:|^)\/\//, '')
  }
})
</script>

<style scoped>
.wrapper {
  display: flex;           display: -webkit-flex;
  flex-direction: row;     -webkit-flex-direction: row;
  flex-grow: 0;            -webkit-flex-grow: 0;
  flex-wrap: wrap;         -webkit-flex-wrap: wrap;
}
.text {
  flex-grow: 1;           -webkit-flex-grow: 1;
}
.text {
  width: 150px;
}
.distance {
  width: 80px;
}
.distance span {
  padding-left: 5px;
}
.datetime {
  width: 90px;
}
.race-name {
  width: 220px;
}
.website {
  width: 200px;
}
.actions {
  text-align: right;
}
.race-table #header {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.race-table #header div {
  flex: wrap;
	background: #323237;
	font-weight: lighter;
	padding: 2px 7px;
}
.race-table .tbrow {
  display: flex;
  flex: wrap;
  width: 100%;
  border-bottom: 2px solid #323237;
  margin-top: 3px;
  margin-bottom: 3px;
}
.race-table .tbrow > div {
  flex: wrap;
	color: #F7F7F7;
	padding: 10px;
	border-bottom: 0.5px solid #323237;
}
@media screen and (max-width: 780px) {
  .race-table .tbrow > div {
    padding: 4px;
  }
}
.distance .chosen {
  color: #0DFFAE;
}
.race-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>
