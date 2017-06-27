<template>
<div class="row justify-content-center">
<div class="race-profile col-md-4 bordered">
    <section id="race-title" class="container">
        <h1 class="race-profile-title">{ {race.name}} <span class="race-profile-check">Premier Partner</span></h1>
        <h2 class="race-profile-dropdown">
            <select v-model="filter_state" @change="updateFilter()">
                <option value="Marathon" selected>Marathon</option>
                <option value="5k">5k</option>
            </select>
        </h2>
    </section>
    <section id="race-picture" class="container">
        <img class="race-profile-picture" src="/static/imgs/profiles/default-race-header.png">
    </section>
    <section id="race-info" class="container line-below">
        <div class="row">
            <div class="col-sm-6">
                <h2>Event Details</h2>
                <dl>
                    <dt>Distance</dt>
                    <dd>{ {course.distance}}</dd>
                </dl>
                <dl>
                    <dt>Date</dt>
                    <dd>{ {race.datetime}}</dd>
                </dl>
                <dl>
                    <dt>Start times(s)</dt>
                    <dd>9:00am drop down</dd>
                </dl>
                <dl>
                    <dt>Participants</dt>
                    <dd>4,500</dd>
                </dl>
                <dl>
                    <dt>Avg. finisher time</dt>
                    <dd>3:34:12</dd>
                </dl>
                <dl>
                    <dt>Course time limit</dt>
                    <dd>6 hrs</dd>
                </dl>
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
                <a><em>Elevation map</em></a>
            </div>
            <div class="col-sm-6">
                <div >
                    <button class="register">Register</button>
                </div>
                <div>
                    <gmap-map
                        :options="{styles: styles}"
                        :center="center"
                        :zoom="zoom"
                        style="width: 100%; height: 175px"
                        @bounds_changed="update"
                        >
                    </gmap-map>
                </div>
                <div>
                    <a><em>Directions</em></a>
                    <a><em>Course Map</em></a>
                    <a><em>Aid Stations</em></a>
                </div>
            </div>
        </div>
    </section>
    <section id="race-details" class="container line-below">
        <h2>Raceday Details</h2>
        <dl class="editable">
            <dt>Amenities</dt>
            <dd>Shirt, finisher medal, food & drink</dd>
        </dl>
        <dl class="editable">
            <dt>Packet / Race bib pick up</dt>
            <dd>In-person at Race Expo</dd>
        </dl>
        <dl class="editable">
            <dt>Parking / transit</dt>
            <dd>Free bus transit for participants</dd>
        </dl>
        <dl class="editable">
            <dt>Gear check</dt>
            <dd>Free for participants at race start</dd>
        </dl>
        <dl class="editable">
            <dt>Race rules</dt>
            <dd>No pacers, infants, bib switching </dd>
        </dl>
        <dl class="editable">
            <dt>Awards</dt>
            <dd>Top three finishers</dd>
        </dl>
        <dl class="editable">
            <dt>Divisions</dt>
            <dd>Male, female age brackets</dd>
        </dl>

        <h2>Records</h2>
        <dl>
            <dt>Male</dt>
            <dd>Brad Hawthorne, 1987, 2:16:39</dd>
        </dl>
        <dl>
            <dt>Female</dt>
            <dd>Svetlana Vasilyeva, 1996, 2:41:34</dd>
        </dl>
        <a><em>View full records</em></a>
    </section>

    <section id="race-partners">
        <h2>Event partners</h2>
        <img class="race-profile-picture" src="/static/imgs/profiles/default-race-partner.png">
    </section>
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
  name: 'race-profile',
  asyncComputed: {
    races: {
      get () {
        // return new Promise((resolve, reject) => {
        var favorites = Object.keys(this.favorites).filter((id) => this.favorites[id])
        if (!favorites.length) {
          return []
        }
        var query = {'_id': {'$in': favorites}}
        return rp.get('race2?query=' + JSON.stringify(query))
      },
      default: []
    }
  },
  mounted () {
    if (!this.$store.state.user || !this.$store.state.user.first_name) {
      this.$router.push('/app/useredit')
    }
  },
  computed: {
  },
  data () {
    return {
      styles: MapStyles,
    }
  }
}
</script>

<style scoped>
h1 {
	color: #D6D6D6;
	font-size: 16px;
	font-weight: 900;
	line-height: 22px;
}
h2 {
	color: #D8D8D8;
	font-size: 12px;
	font-weight: 900;
	line-height: 16px;
    margin: 10px 0px 5px 0px;
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
	font-size: 11px;
	font-weight: 300;
	line-height: 15px;
    display: inline-block;
    width: 50%;
}
dd {
	color: #D8D8D8;
	font-size: 11px;
	font-weight: 900;
	line-height: 15px;
    display: inline-block;
    margin-bottom: 0px;
}
button {
	color: #22262B;
	font-size: 14px;
	font-weight: 900;
	line-height: 19px;
	text-align: center;
    width: 100%;
    padding: 5px 0px 5px 0px;
}
button.register {
    margin-top: 12px;
}
.vue-map-container {
    margin: 10px 0px 10px 0px;
}
section {
    padding-bottom: 20px;
    margin-top: 10px;
}
section.line-below {
    border-bottom: 0.5px solid #979797; 
}
span.race-profile-check {
    color: #9B9B9B;
    font-size: 10px;
    font-weight: 900;
    line-height: 14px;
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
    padding: 5px 0px 5px 0px;
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
</style>
