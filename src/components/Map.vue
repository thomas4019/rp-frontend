<template>
  <div>
    <gmap-map
      :options="{styles: styles, mapTypeControl: false, streetViewControl: false}"
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
        :icon="m.icon"
        @mouseover="select(m)"
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
      libraries: 'places', // If you need to use place input
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
        var race = marker.race
        // check if its the same marker that was selected if yes toggle
        if (this.selected === marker.race_id) {
          this.infoWinOpen = !this.infoWinOpen
        } else {
           // if different marker set infowindow to open and reset current marker index
          this.infoWinOpen = true
          this.selected = marker.race_id
          this.infoWindowPos = marker.position
          this.infoContent = '<div class="infowindow-body">' +
            '<div class="name">' + race.name + '</div>' +
            '<div class="distances">' + race.courses.map((course) => course.distance).join('<span class="bullet"></span>') + '</div>' +
            '<span class="bullet"></span><div class="date">' + moment(race.datetime).format('MM/DD/YYYY') + '</div>' +
            '<span class="bullet"></span><div class="location">' + race.location.city + ', ' + race.location.state + '</div>' +
            '<div class="link"><a target="_blank" href="' + race.website + '"><em>' + race.website + '</em></a></div>' +
            '</div>'
        }
      },
      getGeolocation () {
        console.log(this.$store.state.user.address)
        if (this.$store.state.user.address) {
          var key = 'AIzaSyDPHwV91x39GGO09KE34AHDJwYyA-j8dtk'
          var address = this.$store.state.user.address
          var query = address.line1 + address.line2 + address.city + address.state + address.zip
          rp.getExternal('https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=' + key)
          .then((data) => {
            console.log('GEOCODE', data)
            if (!data.results[0]) {
              console.error(data)
            }
            var latlng = data.results[0].geometry.location
            if (data.status !== 'ZERO_RESULTS') {
              this.searchCoordinates = latlng
              this.zoom = this.$route.path.includes('/app') ? 10 : 6
            }
          })
        } else if (navigator.geolocation) {
          console.log('NAV')
          navigator.geolocation.getCurrentPosition(position => {
            console.log('NAV', position)
            this.searchCoordinates = { lat: position.coords.latitude, lng: position.coords.longitude }
          })
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
        // When we zoom out we only want to show more prominent races to reduce server load
        // as well as keep the browser responsive.
        if (width > 4) {
          prominance = 1
        }
        if (width > 8) {
          prominance = 2
        }
        // If the user has narrowed their search, we should show all races that match.
        if (this.$store.state.search_text ||
            this.$store.state.filters['location.state'] ||
            this.$store.state.filters['datetime']['$gte'] > new Date().toString() ||
            this.$store.state.filters['datetime']['$lte'] < '2100') {
          prominance = 0
        }
        var query = {
          status: 'visible',
          'prominance': {
            '$gte': prominance,
          },
          $and: [],
          'location.coordinates.lat': {
            '$gt': Math.min(b.f.f, b.f.b),
            '$lt': Math.max(b.f.f, b.f.b),
          },
          'location.coordinates.lng': {
            '$gt': Math.min(b.b.b, b.b.f),
            '$lt': Math.max(b.b.b, b.b.f),
          }
        }
        this.$store.state.search_text.split(' ').forEach(function (word) {
          query['$and'].push({'terms': {'$regex': word, '$options': 'i'}})
        })
        Object.assign(query, this.$store.state.filters)
        if (!query['location.state']) {
          delete query['location.state']
        }
        if (JSON.stringify(this.prevQuery) === JSON.stringify(query)) {
          // Avoid sending duplicate requests
          return
        }
        console.log('Map Update')
        this.prevQuery = query
        var querytime = new Date()
        rp.get('race2?limit=' + this.limit + '&query=' + JSON.stringify(query))
          .then((races) => {
            if (this.last_update_time > querytime) {
              return
            }
            this.last_update_time = querytime
            this.races = races
            this.markers = races.map((race) => ({
              'race_id': race._id,
              'race': race,
              icon: {
                labelOrigin: {x: 15, y: 40},
                url: '/static/imgs/mapiconA2x.png',
                scaledSize: {width: 15, height: 25.5},
              },
              'position': {
                'lat': parseFloat(race.location.coordinates.lat) + (pseudoRandom(race, 31) - 0.5) / 50,
                'lng': parseFloat(race.location.coordinates.lng) + (pseudoRandom(race, 71) - 0.5) / 50
              }
            }))
          })
        if (this.$store.state.filters['location.state'] && this.$store.state.filters['location.state'] !== 'ALL') {
          var stateName = this.$store.state.filters['location.state']
          var key = 'AIzaSyDPHwV91x39GGO09KE34AHDJwYyA-j8dtk'
          rp.getExternal('https://maps.googleapis.com/maps/api/geocode/json?components=administrative_area:' + stateName + '|country:US&key=' + key)
          .then((data) => {
            console.log('GEOCODE', data)
            if (!data.results[0]) {
              console.log(stateName)
              console.error(data)
            }
            var latlng = data.results[0].geometry.location
            if (data.status !== 'ZERO_RESULTS') {
              this.searchCoordinates = latlng
              this.zoom = this.$route.path.includes('/app') ? 10 : 6
            }
          })
        }
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
    mounted () {
      this.getGeolocation()
    },
    computed: {
      center () {
        console.log('Computing center of map', this.searchCoordinates, (this.$store.state.user.address || {}).coordinates, {lat: 39.0902, lng: -95.7129})
        return this.searchCoordinates || (this.$store.state.user.address || {}).coordinates || {lat: 39.0902, lng: -95.7129}
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
        searchCoordinates: null,
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
        },
        limit: 100,
        last_update_time: null,
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
/* Selects above the inner content in the info map box and pads it */
.gm-style-iw div:first-child div:first-child {
  padding: 20px 20px;
}
/* Selects the 1px border around info map box */
.gm-style div:first-child div:nth-child(4) div:first-child[style*="cursor: default"]{
  background-color: #323238;
}
/* Selects box around content again */
.gm-style div:first-child div:nth-child(4) div:first-child[style*="cursor: default"] div:first-child div:nth-child(4) {
  background-color: #323238 !important;
}
/* Selects the close button around info map box */
.gm-style div:first-child div:nth-child(4) div:first-child[style*="cursor: default"] img {
  display:none;
}
/* Selects the down arrow below the info map box */
.gm-style div:first-child div:nth-child(4) div:first-child[style*="cursor: default"] div:first-child div:nth-child(3) div div {
  background-color: #323238 !important;
}
.gm-style-iw div:first-child {
  overflow: initial !important;
}
.gm-style-iw div:first-child div:first-child {
  overflow: initial !important;
  overflow-wrap: break-word;
}
.gm-style-iw {
   width: 350px !important;
   top: 0 !important;
   left: 0 !important;
   border-radius: 2px 2px 0 0;
}
.gm-style .gm-style-iw {
  overflow: initial;
}
.infowindow-body {
  color: #D8D8D8;
  font-size: 12px;
  padding: 0px 0px !important;
  max-width: 300px;
  margin-right: -40px;
}
.infowindow-body .distances,
.infowindow-body .date, 
.infowindow-body .location {
  display: inline-block;
  color: #9B9B9B;
  font-size: 12px;
  opacity: 0.6;
  line-height: 16px;
  font-weight: 300;
}
.infowindow-body span.bullet {
  background-color: #9B9B9B;
  width: 5px;
  height: 5px;
  margin: 1px 8px;
}
.infowindow-body .name {
	font-size: 14px;
	font-weight: 900;
	line-height: 19px;
  color: #D6D6D6;
  padding: 10px 0px !important;
}
.infowindow-body .link {
  font-weight: 300;
  line-height: 16px;
  margin-top: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
