<template>
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
    :icon="icon"
  ></gmap-marker>
  </gmap-map>
</template>

<script>
  import rp from '../rp'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'
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
      update (b) {
        if (!b) {
          console.error('empty bounds')
          return
        }
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
        rp.get('race2?limit=100000&query=' + JSON.stringify(query))
          .then((races) => {
            this.markers = races.map((race) => ({
              'position': {
                'lat': parseFloat(race.location.coordinates.lat) + (pseudoRandom(race, 31) - 0.5) / 50,
                'lng': parseFloat(race.location.coordinates.lng) + (pseudoRandom(race, 71) - 0.5) / 50
              }
            }))
          })
      }
    },
    computed: {
      center () {
        return (this.$store.state.user.address || {}).coordinates || {lat: 37.77, lng: -122.41}
      },
      filters () {
        console.log(this.$store.state.filters)
        return this.$store.state.filters
      }
    },
    data () {
      return {
        styles: MapStyles,
        // center: {lat: 10.0, lng: 10.0},
        icon: {
          labelOrigin: {x: 15, y: 40},
          url: '/static/imgs/mapiconA2x.png',
          scaledSize: {width: 20, height: 34},
        },
        markers: []
      }
    }
  }
</script>

<style>

</style>
