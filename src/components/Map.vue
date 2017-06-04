<template>
  <gmap-map
    :options="{styles: styles}"
    :center="center"
    :zoom="7"
    style="width: 100%; height: 450px"
    @bounds_changed="update"
  >
  <gmap-cluster>
    <gmap-marker 
      v-for="m in markers"
      :key="m"
      :position.sync="m.position"
      :clickable="true"
      :draggable="true"
      :icon="icon"
    ></gmap-marker>
  </gmap-cluster>
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

  export default {
    name: 'rp-map',
    methods: {
      update (b) {
        if (!b) {
          console.error('empty bounds')
          return
        }
        var query = {
          status: 'visible',
          'location.coordinates.lat': {
            '$gt': Math.min(b.f.f, b.f.b),
            '$lt': Math.max(b.f.f, b.f.b),
          },
          'location.coordinates.lng': {
            '$gt': Math.min(b.b.b, b.b.f),
            '$lt': Math.max(b.b.b, b.b.f),
          }
        }
        rp.get('race?limit=100000&query=' + JSON.stringify(query))
          .then((races) => {
            this.markers = races.map((race) => ({
              'position': race.location.coordinates
            }))
          })
      }
    },
    data () {
      return {
        styles: MapStyles,
        center: {lat: 10.0, lng: 10.0},
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
