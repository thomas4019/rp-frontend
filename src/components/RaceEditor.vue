<template>
<div class="race-editor">
  <div class="">
    <div class="row">
      <div class="col-12">
        <section id="race-title" class="line-below">
          <h1 class="race-profile-title">Bulk Editor</h1>
        </section>
        <section class="line-below">
          <div class="row">
            <div class="col-12 col-md-12">
                Search:
                <input v-model="query_text" @change="update()" @keyup="update()" placeholder="Search races by name" type="textbox" />
            </div>
          </div>
        </section>

        <section class="line-below">
          <table class="table">
             <thead>
              <tr>
                <th colspan="18">Race</th>
                <th class="course" colspan="16">Courses</th>
              <tr>
                <th></th>
                <th>#</th>
                <th>Name</th>
                <th>Date & Time</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>City Latitude</th>
                <th>City Longitude</th>
                <th>Min KM Dist.</th>
                <th>Max KM Dist.</th>
                <th>Website</th>
                <th>Facebook</th>
                <th>Twitter</th>
                <th>Source</th>
                <th>Status</th>
                <th>Prominance</th>
                <th>Slug</th>
                <th>Terms</th>
                <th class="course">distance</th>
                <th class="course">distance_km</th>
                <th class="course">about</th>
                <th class="course">awards</th>
                <th class="course">bibs</th>
                <th class="course">transit</th>
                <th class="course">scoring</th>
                <th class="course">average_finish_time</th>
                <th class="course">participants</th>
                <th class="course">course_time_limit</th>
                <th class="course">divisions</th>
                <th class="course">waves</th>
                <th class="course">amenities</th>
                <th class="course">records</th>
                <th class="course">expo</th>
                <th class="course">map</th>
              </tr>
            </thead>

            <tbody v-for="race in races">
              <tr class="race-row">
                <td :rowspan="race.courses.length"><button @click="save(race)">Save</button></td>
                <td :rowspan="race.courses.length">{{race._id}}</td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.name"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.datetime"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.location.city"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.location.state"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.location.country"/></td>
                <td :rowspan="race.courses.length"><input type="number" v-model.number="race.location.coordinates.lat"/></td>
                <td :rowspan="race.courses.length"><input type="number" v-model.number="race.location.coordinates.lng"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.distance_km_min"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.distance_km_max"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.website"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.facebook"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.twitter"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.source"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.status"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.prominance"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.slug"/></td>
                <td :rowspan="race.courses.length"><input type="text" v-model="race.terms"/></td>
                <td class="single-course"><input type="text" v-model="race.courses[0].distance"/></td>
                <td><input type="number" v-model.number="race.courses[0].distance_km"/></td>
                <td><input type="text" v-model="race.courses[0].about"/></td>
                <td><input type="text" v-model="race.courses[0].awards"/></td>
                <td><input type="text" v-model="race.courses[0].bibs"/></td>
                <td><input type="text" v-model="race.courses[0].transit"/></td>
                <td><input type="text" v-model="race.courses[0].scoring"/></td>
                <td><input type="text" v-model="race.courses[0].average_finish_time"/></td>
                <td><input type="number" v-model.number="race.courses[0].participants"/></td>
                <td><input type="text" v-model="race.courses[0].course_time_limit"/></td>
                <td><input type="text" disabled v-model="race.courses[0].divisions"/></td> <!-- todo array of strings -->
                <td><input type="text" disabled v-model="race.courses[0].waves"/></td> <!-- todo array of strings -->
                <td><input type="text" disabled v-model="race.courses[0].amenities"/></td> <!-- todo array of strings -->
                <td><input type="text" disabled v-model="race.courses[0].records"/></td> <!-- todo object of male/female strings -->
                <td><input type="text" disabled v-model="race.courses[0].expo"/></td> <!-- todo object with lat/num, lng/num, date/str, location/str, admission/str -->
                <td><input type="text" disabled v-model="race.courses[0].map"/></td> <!-- object with stations array/string, elevation array/num, start_coordinate (lat, lng, location/string), end_coordinate -->
              </tr>
                <template v-for="(course, index) in race.courses">
                  <tr class="course-row" v-show="index !== 0">
                    <td><input type="text" v-model="course.distance"/></td>
                    <td><input type="number" v-model.number="course.distance_km"/></td>
                    <td><input type="text" v-model="course.about"/></td>
                    <td><input type="text" v-model="course.awards"/></td>
                    <td><input type="text" v-model="course.bibs"/></td>
                    <td><input type="text" v-model="course.transit"/></td>
                    <td><input type="text" v-model="course.scoring"/></td>
                    <td><input type="text" v-model="course.average_finish_time"/></td>
                    <td><input type="number" v-model.number="course.participants"/></td>
                    <td><input type="text" v-model="course.course_time_limit"/></td>
                    <td><input disabled type="text" v-model="course.divisions"/></td>
                    <td><input disabled type="text" v-model="course.waves"/></td>
                    <td><input disabled type="text" v-model="course.amenities"/></td>
                    <td><input disabled type="text" v-model="course.records"/></td>
                    <td><input disabled type="text" v-model="course.expo"/></td>
                    <td><input disabled type="text" v-model="course.map"/></td>
                  </tr>
                </template>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import rp from '../rp'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import MapStyles from '../mapstyle'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAYMq0Meyau1Q9hMFlyETxUdcv-io5NjwI',
  }
})

export default {
  name: 'RaceEditor',
  components: {
  },
  methods: {
    update () {
      var query = {
        status: 'visible',
        $and: []
      }
      this.query_text.split(' ').forEach(function (word) {
        query['$and'].push({'terms': {'$regex': word, '$options': 'i'}})
      })
      rp.get('race2?limit=' + this.limit + '&query=' + JSON.stringify(query)).then((races) => {
        this.races = races
        console.log(races)
      })
    },
    saveSuccessful (race) {
      this.$set(race, 'wasSaved', true)
      setTimeout(() => {
        this.$set(race, 'wasSaved', false)
      }, 1000)
    },
    save (race) {
      var data = {
        $set: {
          'name': race.name,
          'datetime': race.datetime,
          'location': race.location,
          'courses': race.courses,
          'distance_km_min': race.distance_km_min,
          'distance_km_max': race.distance_km_max,
          'website': race.website,
          'facebook': race.facebook,
          'twitter': race.twitter,
          'source': race.source,
          'status': race.status,
          'prominance': race.prominance,
          'slug': race.slug,
          'terms': race.terms,
        }
      }
      // fix number conversions
      console.log(data)
      rp.post('race2/' + race._id + '/update', data)
      .then((result) => {
        console.log(result)
      }, (err) => {
        console.error('error signing in')
        console.error(err)
      })
    }
  },
  mounted () {
    this.update()
  },
  data () {
    return {
      styles: MapStyles,
      races: [],
      query_text: '',
      limit: 10,
    }
  }
}
</script>

<style scoped>
.table input[type=number],
.table input[type=text] {
  border: none;
  background: none;
  color: #F7F7F7;
  font-size: 14px;
  padding: 0px;
  margin: 0px;
  width: 100%;
}
table {
  margin: 0px 15px;
}
.course-row td:first-child, .single-course {
  border-left: 1px solid #444;
}
.course-row:nth-child(odd) {
  background-color: #292929
}
.race-row button {
  font-size: 12px;
  padding: 2px 10px;
}
th.course {
  background-color: #444;
}
td, th {
  max-width: 150px;
  min-width: 50px;
  word-wrap: break-word;
}
tbody:hover td[rowspan], tr:hover td {
   background-color: #323237; 
}
</style>
