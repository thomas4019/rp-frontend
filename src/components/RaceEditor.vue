<template>
<div class="race-editor">
  <div class="">
    <div class="row">
      <div class="col-12">
        <div style="margin-top:20px" id="race-title" class="line-below">
          <h1 class="race-profile-title">Bulk Editor</h1>
        </div>
        <div style="margin-top:20px"  class="line-below">
          <div class="row">
            <div class="col-12 col-md-12">
              Search:
              <input style="width:350px;" v-model="query_text" @change="update()" @keyup="update()" placeholder="Search races by name" type="textbox" />
              Number of Displayed Results:
              <select v-model="limit" @change="update()">
                <option selected>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>

        <section class="line-below">
          <!-- <RpDrawableMap></RpDrawableMap> -->


          <table class="table ">
             <thead>
              <tr>
                <th colspan="20">Race</th>
                <th class="course" colspan="17">Courses</th>
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
                <th>Photo URL</th>
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
                <th style="min-width: 135px" class="course">divisions</th>
                <th style="min-width: 115px" class="course">waves</th>
                <th style="min-width: 200px" class="course">amenities</th>
                <th style="min-width: 140px" class="course">Male Record</th>
                <th style="min-width: 140px" class="course">Female Record</th>
                <th class="course">Expo Latitude</th>
                <th class="course">Expo Longitude</th>
                <th class="course">Expo Date</th>
                <th class="course">Expo Location</th>
                <th class="course">Expo Admission</th>
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
                <td :rowspan="race.courses.length"><input type="text" v-model="race.banner_picture"/></td>
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
                <td>
                  <div class="array-input" v-for="division in race.courses[0].divisions">
                    <input class="division" type="number" v-model.number="division.min"/> - 
                    <input class="division" type="number" v-model.number="division.max"/>
                    <div class="delete" @click="removeDivision(race.courses[0], division)">x</div>
                  </div>
                  <button class="hollow" @click="addDivision(race.courses[0])">Add Division</button>
                </td>
                <td>
                  <div class="array-input" v-for="wave in race.courses[0].waves">
                    <input class="wave" type="text" v-model="wave.time"/>
                    <div class="delete" @click="removeWave(race.courses[0], wave)">x</div>
                  </div>
                  <button class="hollow" @click="addWave(race.courses[0])">Add Wave</button>
                </td> <!-- todo array of strings -->
                <td>
                  <button class="hollow" v-show="!race.courses[0].showAmenities" @click="race.courses[0].showAmenities = true">Show Amenities</button>
                  <div v-show="race.courses[0].showAmenities">
                    <label><input type="checkbox" v-model="race.courses[0].amenities" id="c" value="Finisher medal"/> Finisher medal </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" id="a"  value="Electronic certificate"/> Electronic certificate </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" id="b"  value="T-shirt"/> T-shirt </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" value="Technical long-sleeve"/> Technical long-sleeve </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" value="Water / beverages"/> Water / beverages </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" value="Heat sheet"/> Heat sheet </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" value="Free race photos"/> Free race photos </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" value="Medical care"/> Medical care </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" value="Free transit"/> Free transit </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" value="Free parking"/> Free parking </label>
                    <label><input type="checkbox" v-model="race.courses[0].amenities" value="Portable bathrooms"/> Portable bathrooms </label>
                    <button class="hollow" @click="race.courses[0].showAmenities = false">Hide Amenities</button>
                  </div>
                </td> <!-- todo array of strings -->
                <td>
                  <input type="text" v-model="race.courses[0].records.male"/>
                </td>
                <td>
                  <input type="text" v-model="race.courses[0].records.female"/>
                </td>
                <td><input type="text" disabled v-model="race.courses[0].expo.lat"/></td>
                <td><input type="text" disabled v-model="race.courses[0].expo.lng"/></td>
                <td><input type="text" disabled v-model="race.courses[0].expo.date"/></td> 
                <td><input type="text" disabled v-model="race.courses[0].expo.location"/></td> 
                <td><input type="text" disabled v-model="race.courses[0].expo.admission"/></td>
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
                    <td>
                      <div class="array-input" v-for="division in course.divisions">
                        <input class="division" type="number" v-model.number="division.min"/> - 
                        <input class="division" type="number" v-model.number="division.max"/>
                        <div class="delete" @click="removeDivision(course, division)">x</div>
                      </div>
                      <button class="hollow" @click="addDivision(course)">Add Division</button>
                    </td>
                    <td>
                      <div class="array-input" v-for="wave in course.waves">
                        <input class="wave" type="text" v-model="wave.time"/>
                        <div class="delete" @click="removeWave(course, wave)">x</div>
                      </div>
                      <button class="hollow" @click="addWave(course)">Add Wave</button>
                    </td>
                    <td>
                      <button class="hollow" v-show="!course.showAmenities" @click="course.showAmenities = true">Show Amenities</button>
                      <div v-show="course.showAmenities">
                        <label><input type="checkbox" v-model="course.amenities" id="c" value="Finisher medal"/> Finisher medal </label>
                        <label><input type="checkbox" v-model="course.amenities" id="a"  value="Electronic certificate"/> Electronic certificate </label>
                        <label><input type="checkbox" v-model="course.amenities" id="b"  value="T-shirt"/> T-shirt </label>
                        <label><input type="checkbox" v-model="course.amenities" value="Technical long-sleeve"/> Technical long-sleeve </label>
                        <label><input type="checkbox" v-model="course.amenities" value="Water / beverages"/> Water / beverages </label>
                        <label><input type="checkbox" v-model="course.amenities" value="Heat sheet"/> Heat sheet </label>
                        <label><input type="checkbox" v-model="course.amenities" value="Free race photos"/> Free race photos </label>
                        <label><input type="checkbox" v-model="course.amenities" value="Medical care"/> Medical care </label>
                        <label><input type="checkbox" v-model="course.amenities" value="Free transit"/> Free transit </label>
                        <label><input type="checkbox" v-model="course.amenities" value="Free parking"/> Free parking </label>
                        <label><input type="checkbox" v-model="course.amenities" value="Portable bathrooms"/> Portable bathrooms </label>
                        <button class="hollow" @click="course.showAmenities = false">Hide Amenities</button>
                      </div>
                    </td>
                    <td>
                      <input type="text" v-model="course.records.male"/>
                    </td>
                    <td>
                      <input type="text" v-model="course.records.female"/>
                    </td>
                    <td><input type="text" disabled v-model="course.expo.lat"/></td>
                    <td><input type="text" disabled v-model="course.expo.lng"/></td>
                    <td><input type="text" disabled v-model="course.expo.date"/></td> 
                    <td><input type="text" disabled v-model="course.expo.location"/></td> 
                    <td><input type="text" disabled v-model="course.expo.admission"/></td>
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
import toastr from 'toastr'
import RpDrawableMap from '@/components/DrawableMap'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAYMq0Meyau1Q9hMFlyETxUdcv-io5NjwI',
  }
})

export default {
  name: 'RaceEditor',
  components: {
    RpDrawableMap
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
        // pre-process for missing variables, add in temp variables used in display
        for (var i = 0; i < races.length; i++) {
          for (var k = 0; k < races[i].courses.length; k++) {
            var course = races[i].courses[k]
            course.showAmenities = false
            if (!course.amenities) {
              course.amenities = []
            }
            if (!course.records) {
              course.records = {}
            }
            if (!course.expo) {
              course.expo = {}
            }
          }
        }
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
    save (raceToSave) {
      var race = Object.assign({}, raceToSave)
      for (var k = 0; k < race.courses.length; k++) {
        delete race.courses[k].showAmenities
      }
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
      console.log(data)
      rp.post('race2/' + race._id + '/update', data)
      .then((result) => {
        console.log(result)
        toastr.success('Saved ' + race.name + ' successfully')
      }, (err) => {
        console.error('error signing in')
        console.error(err)
        toastr.error(err.message || 'Error while attempting to save ' + race.name)
      })
    },
    addDivision (course) {
      if (!course.divisions) {
        this.$set(course, 'divisions', [])
      }
      course.divisions.push({})
      toastr.success('Added division')
    },
    removeDivision (course, division) {
      var index = course.divisions.indexOf(division)
      if (index > -1) {
        course.divisions.splice(index, 1)
      }
    },
    addWave (course) {
      if (!course.waves) {
        this.$set(course, 'waves', [])
      }
      course.waves.push({})
      toastr.success('Added wave')
    },
    removeWave (course, wave) {
      var index = course.waves.indexOf(wave)
      if (index > -1) {
        course.waves.splice(index, 1)
      }
    }

  },
  mounted () {
    /* this.update() */
    console.log('Mounted')
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
.table .array-input input {
  border: 1px solid #444;
  margin-bottom: 4px;
}
.table input.division {
  width: 40px;
}
.table input.wave {
  width: 60px;
}




.delete {
  display: none;
  cursor: pointer;
}
div.array-input:hover .delete {
  display: inline-block;
}
.course-row button,
.race-row button {
  font-size: 12px;
  padding: 2px 10px;
}
th.course {
  background-color: #444;
}
td, th {
  max-width: 200px;
  min-width: 50px;
  word-wrap: break-word;
}
tbody:hover td[rowspan], tr:hover td {
   background-color: #323237; 
}
</style>
