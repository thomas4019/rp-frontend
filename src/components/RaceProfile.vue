<template>
<div class="race-profile">
  <section id="race-picture" v-if="race.banner_picture">
      <img class="race-profile-picture" :src="race.banner_picture">
  </section>
  <div class="container" style="margin-top: 20px;">
    <div class="row justify-content-center">
        <div class="race-profile col-md-10">
          <div class="row">
            <div class="col-md-4 col-12 push-md-8 bordered actions">
              <button>Register</button>
              <hr />
              <button class="grey">Add to wishlist</button>
            </div>
            <div class="col-md-8 col-12 pull-md-4">
              <section id="race-title" class="line-below">
                  <h1 class="race-profile-title">{{race.name}}</h1>
                  <h3 v-if="race.location">{{race.location.city}} {{race.location.state}} {{race.location.country}}</h3>
              </section>
              <section class="line-below">
                <div class="row">
                  <div class="col-12 col-md-4">
                      <h2>Event distances</h2>
                  </div>
                  <div class="col-12 col-md-8">
                      <ul class="radio-buttons">
                          <li v-for="option in race.courses" v-bind:key="option">
                              <label><input v-model="course" :value="option" type="radio" >{{ option.distance }}</label>
                          </li>
                      </ul>
                  </div>
                </div>
              </section>
              <section class="line-below quick-look">
                <div class="row">
                  <div class="col-md-3">
                    <span class="icon">{{course.distance}}</span> Race distance
                  </div>
                  <div class="col-md-3">
                    <span class="icon">{icon}</span>{{race.datetime}}
                  </div>
                </div>
              </section>

            </div>
          </div>
          <RpAbout :about="course.about" v-if="course.about"></RpAbout>
          <RpSponsors :sponsors="course.sponsors" v-if="course.sponsors"></RpSponsors>

          <section class="line-below" v-if="course.map || course.participants || course.average_finish_time || course.course_time_limit">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Race</h3>
              </div>
              <div class="col-12 col-md-11">
                <dl v-if="course.map && course.map.start_location && course.map.start_location.location">
                    <dt>Start location</dt>
                    <dd>{{course.map.start_location.location}}</dd>
                </dl>
                <dl v-if="course.map && course.map.start_location && course.map.end_location.location">
                    <dt>Finish location</dt>
                    <dd>{{course.map.end_location.location}}</dd>
                </dl>
                <dl v-if="course.participants">
                    <dt>Participants</dt>
                    <dd>{{course.participants}}</dd>
                </dl>
                <dl v-if="course.average_finish_time">
                    <dt>Avg. finisher time</dt>
                    <dd>{{course.average_finish_time}}</dd>
                </dl>
                <dl v-if="course.course_time_limit">
                    <dt>Course time limit</dt>
                    <dd>{{course.course_time_limit}}</dd>
                </dl>
              </div>
            </div>
          </section>

          <section class="line-below" v-if="course.map">
            <h3>Course map</h3>
            <RpDrawableMap class="map" ref="drawablemap" :path="course.map.route" :editable="false"></RpDrawableMap>
            <div class="row" v-if="course.map.stations">
              <div class="col-12 col-md-1">
                <h3>Aid stations</h3>
              </div>
              <div class="col-12 col-md-11">
                <ol>
                  <li>Mile 2.6</li>
                  <li>Mile 4.8</li>
                  <li>Mile 7.8</li>
                </ol>
              </div>
            </div>
          </section>              

          <section class="line-below" v-if="course.map && course.map.elevation">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Elevation Map</h3>
              </div>
              <div class="col-12 col-md-11">
                <h3>Summary</h3>
                <dl>
                  <dt>Race start elevation</dt>
                    <dd>356’</dd>
                </dl>
                <dl>
                    <dt>Race finish altitude</dt>
                    <dd>10’</dd>
                </dl>
                <dl>
                    <dt>Elevation Gain</dt>
                    <dd>+2,182’</dd>
                </dl>
                <dl>
                    <dt>Elevation Drop</dt>
                    <dd>-2,528’</dd>
                </dl>
              </div>
            </div>
          </section>

          <section class="line-below" v-if="course.waves">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Waves</h3>
              </div>
              <div class="col-12 col-md-11">
                <dl v-for="(wave, index) in course.waves">
                    <dt>Wave {{index + 1}}</dt> <dd>{{wave.time}}</dd>
                </dl>
              </div>
            </div>
          </section>


          <section class="line-below" v-if="course.amenities">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Amenities</h3>
              </div>
              <div class="col-12 col-md-11">
                <dl>
                    <dt>Amenities</dt> <dd>Finisher Medal</dd>
                </dl>
              </div>
            </div>
          </section>


          <section class="line-below" v-if="course.awards">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Awards</h3>
              </div>
              <div class="col-12 col-md-11">
                <p>{{course.awards}}</p>
              </div>
            </div>
          </section>


          <section class="line-below" v-if="course.scoring">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Scoring</h3>
              </div>
              <div class="col-12 col-md-11">
                <p>{{course.scoring}}</p>
              </div>
            </div>
          </section>

          <section class="line-below" v-if="course.divisions">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Divisions</h3>
              </div>
              <div class="col-12 col-md-11">
                <p>Age groups:
                <ul>
                  <li v-for="division in course.divisions">
                    <span v-if="division.min && division.max">{{division.min}}-{{division.max}}</span>
                    <span v-else-if="!division.min">{{division.max}} and under</span>
                    <span v-else-if="!division.max">{{division.min}}+</span>
                  </li>
                </ul>
                </p>
              </div>
            </div>
          </section>


          <section class="line-below" v-if="course.records">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Course Records</h3>
              </div>
              <div class="col-12 col-md-11">
                <dl><dt>Male</dt> <dd>{{course.records.male}}</dd></dl>
                <dl><dt>Female</dt> <dd>{{course.records.female}}</dd></dl>
              </div>
            </div>
          </section>

          <section class="line-below" v-if="course.expo && course.expo.location">
            <h3>Expo</h3>
            <dl>
                <dt>Date(s) & Time(s)</dt> <dd>.....</dd>
                <dt>Location</dt> <dd>.....</dd>
                <dt>Admission</dt> <dd>Free to the public</dd>
            </dl>
          </section>


          <section class="line-below" v-if="course.expo && course.expo.lat">
            <h3>Expo map</h3>
            <RpMap class="map"></RpMap>
          </section>


          <section class="line-below" v-if="course.bibs">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Bib pick-up</h3>
              </div>
              <div class="col-12 col-md-11">
                <p>{{course.bibs}}</p>
              </div>
            </div>
          </section>


          <section class="line-below" v-if="course.transit">
            <div class="row">
              <div class="col-12 col-md-1">
                <h3>Parking & transit</h3>
              </div>
              <div class="col-12 col-md-11">
                <p>{{course.transit}}</p>
              </div>
            </div>
          </section>

          <section class="line-below" v-if="course.recommendations">
            <h3>Recommended Races</h3>
            <p>Based on this race</p>
          </section>
        </div>
      </div>
    </div>
</div>
</template>


<script>
import RpDrawableMap from '@/components/DrawableMap'
import RpAbout from '@/components/RaceProfileAbout'
import RpSponsors from '@/components/RaceProfileSponsors'
import rp from '../rp'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAYMq0Meyau1Q9hMFlyETxUdcv-io5NjwI',
  }
})

export default {
  name: 'race-profile',
  components: {
    RpDrawableMap,
    RpAbout,
    RpSponsors,
  },
  methods: {
    update () {
      var query = {'_id': {'$eq': this.$route.params.route_id}}
      rp.get('race2?query=' + JSON.stringify(query)).then((races) => {
        console.log(races[0])
        this.race = races[0] || {}
        this.course = this.race.courses[0]
      })
    }
  },
  mounted () {
    this.update()
  },
  data () {
    return {
      race: {},
      course: {}
    }
  }
}
</script>

<style>
/* This applies to all Components included */
.race-profile h1 {
  font-size: 24px;
}
.race-profile h2 {
  font-size: 18px;
  display: inline-block;
}
.race-profile h3 {
  font-size: 14px;
  display: inline-block;
}
.race-profile p {
  font-size: 14px;
  color: #9B9B9B;
  font-weight: 300;
  line-height: 19px;
}
</style>


<style scoped>
@media screen and (min-width: 800px) {
  .hide-on-desktop {
    display: none;
  }
}
@media screen and (max-width: 799px) {
  .hide-on-mobile {
    display: none;
  }
}
.race-profile .actions {
  padding: 15px;
}
hr {
  border-bottom: 1px solid #4A4A4A;
}
.race-profile h1,
.race-profile h2,
.race-profile h3 {
  font-weight: 300;
  color: #D6D6D6;
}
dl {
    margin: 3px;
    margin: 0px 0px 0px 0px;
}
dl.editable::after {
    content: '+';
    float: right;
    font-size: 9px;
    color: #0DFFAE;
    padding-top: 4px;
}
dt {
	color: #9B9B9B;
	font-size: 14px;
	font-weight: 300;
	line-height: 15px;
  display: inline-block;
  width: 20%;
}
dd {
	color: #D8D8D8;
	font-size: 14px;
	font-weight: 900;
	line-height: 15px;
  display: inline-block;
  margin-bottom: 0px;
}
.quick-look {
  color: #9B9B9B;
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  
}
span.icon {
  width: 100%;
  display: block;
  font-size: 18px;
  color: #D8D8D8;
}
button {
  width: 100%;
  padding: 5px 0px 5px 0px;
  border-radius: 4px;
}
.map {
    margin: 10px 0px 10px 0px;
    width: 100%;
    height: 290px;
}
section {
    padding-bottom: 13px;
    margin-top: 13px;
}
section:first-child {
  margin-top: 0px;
}
section.line-below {
    border-bottom: 1px solid #4A4A4A;
}
span.race-profile-check {
    color: #9B9B9B;
    font-size: 10px;
    font-weight: 900;
    line-height: 14px;
}
span.race-profile-check .fa.fa-check {
    color: #0DFFAE;
    display: inline-block;
    border-radius: 60px;
    border: 0.5px solid #0DFFAE;
    padding: 2px 2px 2px 2px;
    margin: 0px 5px 0px 10px;
}

.race-profile-dropdown {
	color: #0DFFAE;
	font-size: 11px;
	font-weight: 300;
	line-height: 15px;
}
#race-title {
    padding: 5px 0px 5px 0px;
}
#race-picture {
    padding: 0px 0px 15px 0px;
}
img.race-profile-picture {
    width:100%;
}
select {
    background: transparent;
    color: #0DFFAE;
    border: none;
    padding: 0px 5px 0px 0px; 
    outline:none;
    font-size: 12px;
  }
option {
background-color: #323237;
color: #0DFFAE;
}
.links a {
    padding-right: 10px;
}
.radio-group label {
   overflow: hidden;
} .radio-group input {
    /* This is on purpose for accessibility. Using display: hidden is evil.
    This makes things keyboard friendly right out tha box! */
   height: 1px;
   width: 1px;
   position: absolute;
   top: -20px;
} .radio-group .not-active  {
   color: #3276b1;
   background-color: #fff;
}
ul.radio-buttons {
  margin: 0;
}

</style>
