<template>
  <div>
    <gmap-map
      :options="{styles: styles}"
      :center="center"
      :zoom="zoom"
      style="width: 90%; height: 640px; margin: 0 5%;"
      @click="placePolylinePoint($event)"
    >
        <gmap-polyline v-if="path.length > 0" :path="path"  :editable="true" @mouseup="updatePath($event)"
            @rightclick="handleClickForDelete"
            ref="polyline">
        </gmap-polyline>
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
        @mouseover="select(m)"
        @click="select(m)"
        :zIndex="10"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  // import rp from '../rp'
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

  export default {
    name: 'rp-drawable-map',
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
            '<div class="distances">' + race.courses.map((course) => course.distance).join(' • ') + '</div>' +
            '<div>' + moment(race.datetime).format('MM/DD/YYYY') +
            ' • ' + race.location.city + ', ' + race.location.state +
            '</div>' +
            '</div>'
        }
      },
      placePolylinePoint (obj) {
        console.log('Place poly point', obj)
        var part = {}
        this.$set(part, 'lat', obj.latLng.lat())
        this.$set(part, 'lng', obj.latLng.lng())
        this.path.push(part)
      },
      updatePath (event) {
        console.log('Path updated', event, event.latLng.lat(), event.latLng.lng())
        if (event.vertex) {
          this.path[event.vertex].lat = event.latLng.lat()
          this.path[event.vertex].lng = event.latLng.lng()
        }
      },
      handleClickForDelete ($event) {
        if ($event.vertex) {
          this.$refs.polyline.$polylineObject.getPath().removeAt($event.vertex)
        }
      },
      update (b) {
        /* var querytime = new Date()
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
                scaledSize: {width: 20, height: 34},
              },
              'position': {
                'lat': parseFloat(race.location.coordinates.lat),
                'lng': parseFloat(race.location.coordinates.lng)
              }
            }))
          }) */
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
        path: [],
        markers: [],
        zoom: zoom,
        selected: '',
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
</script>

<style>
</style>
