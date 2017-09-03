<template>
  <div class="race-table">
    <div class="row no-gutters hide-on-mobile" id="table-header">
      <div class="offset-md-2 col-md-1">Distance</div>
      <div class="col-md-3">Event name</div>
      <div class="col-md-1">Location</div>
      <div class="col-md-1">Date</div>
      <div class="col-md-1">Price</div>
      <div class="col-md-1"></div>
    </div>
    <div class="row no-gutters race" v-for="race in races" v-bind:key="race.id">
      <div class="col-10 col-md-3 push-md-3 race-name">{{race.name}}</div>
      <div class="col-2 col-md-1 push-md-6 actions">
        <RaceActions :race="race" :showRegister="showRegister"></RaceActions>
      </div>
      <div class="col-2 offset-md-3 col-md-1 pull-md-5 distance">
        <span v-for="course in race.courses" :class="{ 'chosen': isSelectedDistance(race, course) }" v-bind:key="course.id">
          {{course.distance}}
        </span>
      </div>
      <div class="col-5 col-md-1 pull-md-2 location">{{race.location.city}}, {{race.location.state}}</div>
      <div class="col-3 col-md-1 pull-md-2 datetime">{{race.datetime | formatDate }}</div>
      <div class="col-2 col-md-1 pull-md-2 price">
        {{race.cost }}
      </div>
    </div>
  </div>
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
      if (!this.$store.state.user.race_signups) {
        return false
      }
      var matching = this.$store.state.user.race_signups.filter((rs) => rs.race_id === race._id)
      if (!matching.length) {
        return false
      }
      return course.distance === matching[0].distance
    },
  },
  props: {
    showRegister: {
      type: Boolean,
      default: true
    },
    races: {
    },
  }
}
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('M/D/YY')
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
  color: #4A4A4A;
}
#table-header {
	background-color: #DBDBDB;
  color: #4A4A4A;
  line-height: 22px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.15);
  font-weight: 900;
  font-size: 16px;
}
.race-table #table-header div {
  padding: 20px 0px 21px 0px;
}
#table-header.row {
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
@media screen and (max-width: 799px) {
  .row.race {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.3);
    background-color: #323237;
    margin: 10px 20px;
    border-radius: 2px;
    padding: 10px 10px 10px 21px;
  }
  .race-name {
    color: #D6D6D6;
    font-size: 12px;
    font-weight: 900;
    line-height: 16px;
    padding: 5px 0px;
  }
  .distance,
  .location,
  .datetime {
    padding: 0px;
    font-size: 12px;
    font-weight: 300;
    line-height: 16px;
    color: #9B9B9B;
  }
  .distance span {
    padding: 0px;
  }
  .website {
    padding: 0px;
    font-size: 12px;
    font-weight: 300;
    line-height: 16px;
    text-align: right;
  }
}
</style>
