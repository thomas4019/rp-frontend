<template>
  <div>
    <gmap-map
      :options="{styles: styles}"
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 450px"
      @bounds_changed="update"
    >
      <gmap-info-window
        class="infowindow"
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        :content="infoContent"
        @closeclick="infoWinOpen=false">
      </gmap-info-window>
      <gmap-marker 
        v-for="m in markers"
        :key="m"
        :position.sync="m.position"
        :clickable="true"
        :icon="m.race_id == selected ? icon : m.icon"
        @click="select(m)"
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
      select (marker) {
        this.infoWindowPos = marker.position
        var race = marker.race
        this.infoContent = '<div class="infowindow-body">' +
          '<div class="name">' + race.name + '</div>' +
          '<div class="distances">' + race.courses.map((course) => course.distance).join(' • ') + '</div>' +
          '<div>' + moment(race.datetime).format('MM/DD/YYYY') +
          ' • ' + race.location.city + ', ' + race.location.state +
          '</div>' +
          '</div>'
        // check if its the same marker that was selected if yes toggle
        if (this.selected === marker.race_id) {
          this.infoWinOpen = !this.infoWinOpen
        } else {
           // if different marker set infowindow to open and reset current marker index
          this.infoWinOpen = true
          this.selected = marker.race_id
        }
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
        if (JSON.stringify(this.prevQuery) === JSON.stringify(query)) {
          // Avoid sending duplicate requests
          return
        }
        this.prevQuery = query
        rp.get('race2?limit=100000&query=' + JSON.stringify(query))
          .then((races) => {
            this.races = races
            this.markers = races.map((race) => ({
              'race_id': race._id,
              'race': race,
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
        return (this.$store.state.user.address || {}).coordinates || {lat: 39.82, lng: -106.58}
      },
      filters () {
        this.update()
        return this.$store.state.filters
      }
    },
    data () {
      console.log(this.$route.path)
      var zoom = this.$route.path.includes('/app') ? 10 : 4
      return {
        styles: MapStyles,
        // center: {lat: 10.0, lng: 10.0},
        icon: {
          labelOrigin: {x: 15, y: 40},
          url: '/static/imgs/mapicon2x.png',
          scaledSize: {width: 20, height: 34},
        },
        zoom: zoom,
        markers: [],
        races: [],
        selected: '',
        bounds: {},
        prevQuery: {},
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
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
.infowindow-body {
  color: black;
}
.name {
	font-size: 18px;
	font-weight: 900;
	line-height: 25px;
}
</style>
