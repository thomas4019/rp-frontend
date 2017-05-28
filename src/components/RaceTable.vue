<template>
 <section id="upcoming-races" class="container">
    <table class="race-table">
      <tr>
        <th>Distance</th>
        <th>Race</th>
        <th>Date</th>
        <th>Location</th>
        <th>Actions</th>
      </tr>
      <tr v-for="race in races">
        <td>{{race.distance | formatRaceDistance}}</td>
        <td>{{race.name}}</td>
        <td>{{race.datetime | formatDate }}</td>
        <td>{{race.location.city}}, {{race.location.state}}</td>
        <td v-on:click="action(race)">
          <button class="button">Register</button>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import Vue from 'vue'
import rp from '../rp'
import moment from 'moment'

export default {
  name: 'race-table',
  props: ['races', 'action'],
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
</style>
