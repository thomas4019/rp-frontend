<template>
  <div>
    <div id="listing-wrapper">
      <div id="listing">
        <div @click="select(race._id)" class="race" v-for="race in races">
          <div class="name">{{race.name}}</div>
          <div class="info distances">
            <span v-for="(course, index) in race.courses">
              {{course.distance}}
              <template v-if="index != race.courses.length - 1"> • </template>
            </span>
          </div>
          <div class="info">{{race.datetime | formatDate}} • {{race.location.city}}, {{race.location.state}}</div>
          <div v-if="race._id == selected" class="info website"><em>{{race.website}}</em></div>
        </div>
      </div>
    </div>
    <gmap-map
      :options="{styles: styles}"
      :center="center"
      :zoom="7"
      style="width: 100%; height: 450px"
      @bounds_changed="update"
    >
    <gmap-marker 
      v-for="m in markers"
      :key="m"
      :position.sync="m.position"
      :clickable="true"
      :icon="m.race_id == selected ? icon : m.icon"
      @click="select(m.race_id)"
      :zIndex="m.race_id == selected ? 10 : 5"
    ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  import rp from '../rp'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'
  import moment from 'moment'
  import MapStyles from '../mapstyle'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAYMq0Meyau1Q9hMFlyETxUdcv-io5NjwI',
      // libraries: 'places', //// If you need to use place input
    }
  })

  function pseudoRandom (race, o) {
    var str = race.name + race.type
    var hash = 0
    if (str.length === 0) return hash
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i)
      hash = hash * o + char
      hash = hash & hash // Convert to 32bit integer
    }
    return (hash / 1000 % 1)
  }

  export default {
    name: 'rp-map',
    methods: {
      select (id) {
        this.selected = id
      },
      update (b) {
        if (!b) {
          b = this.bounds
          if (!b.f) {
            console.error('empty bounds')
            return
          }
        }
        this.bounds = b
        var width = Math.abs(Math.max(b.f.f, b.f.b) - Math.min(b.f.f, b.f.b))
        var prominance = 0
        if (width > 4) {
          prominance = 1
        }
        if (width > 8) {
          prominance = 2
        }

        var query = {
          status: 'visible',
          'prominance': {
            '$gte': prominance,
          },
          'location.coordinates.lat': {
            '$gt': Math.min(b.f.f, b.f.b),
            '$lt': Math.max(b.f.f, b.f.b),
          },
          'location.coordinates.lng': {
            '$gt': Math.min(b.b.b, b.b.f),
            '$lt': Math.max(b.b.b, b.b.f),
          }
        }
        Object.assign(query, this.$store.state.filters)
        if (!query['location.state']) {
          delete query['location.state']
        }
        rp.get('race2?limit=100000&query=' + JSON.stringify(query))
          .then((races) => {
            this.races = races
            this.markers = races.map((race) => ({
              'race_id': race._id,
              icon: {
                labelOrigin: {x: 15, y: 40},
                url: '/static/imgs/mapiconA2x.png',
                scaledSize: {width: 20, height: 34},
              },
              'position': {
                'lat': parseFloat(race.location.coordinates.lat) + (pseudoRandom(race, 31) - 0.5) / 50,
                'lng': parseFloat(race.location.coordinates.lng) + (pseudoRandom(race, 71) - 0.5) / 50
              }
            }))
          })
      }
    },
    watch: {
      filters: {
        handler: function () {
          this.update()
        },
        deep: true
      }
    },
    computed: {
      center () {
        return (this.$store.state.user.address || {}).coordinates || {lat: 37.77, lng: -122.41}
      }
    },
    data () {
      return {
        styles: MapStyles,
        // center: {lat: 10.0, lng: 10.0},
        icon: {
          labelOrigin: {x: 15, y: 40},
          url: '/static/imgs/mapicon2x.png',
          scaledSize: {width: 20, height: 34},
        },
        markers: [],
        races: [],
        selected: '',
        bounds: {}
      }
    }
  }
  Vue.filter('formatDate', function (value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY')
    }
  })
</script>

<style>
#listing-wrapper {
  height: 450px;
  width: 250px;
  float: left;
  position: relative;
  z-index: 200;
  overflow: hidden;
}
#listing {
  width: 285px;
  height: 450px;
  float: left;
  position: relative;
  z-index: 200;
  background-color: #24272A;
  padding-right: 17px;
  overflow-y: scroll;
}
.race {
	border-bottom: 0.5px solid #979797;
	border-top: 0.5px solid #979797;
  padding: 10px;
}
.info {
	opacity: 0.6;
	color: #9B9B9B;
	font-size: 16px;
	font-weight: 300;
	line-height: 22px;
}
.name {
	color: #D6D6D6;
	font-size: 18px;
	font-weight: 900;
	line-height: 25px;
}
</style>
