<template>
  <div>
    <gmap-map
      :options="{styles: styles}"
      :center="center"
      :zoom="zoom"
      style="width: 90%; height: 640px; margin: 0 5%;"
      @click="placePolylinePoint($event)"
      ref="map"
    >
        <gmap-polyline 
            v-if="path.length > 0" 
            :path="path" 
            :deepWatch="true" 
            :editable="true" 
            @path_changed="updatePath"
            @dblclick="setVertexAsAidStation"
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
  import MapStyles from '../mapstyle'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAYMq0Meyau1Q9hMFlyETxUdcv-io5NjwI',
    }
  })

  export default {
    name: 'rp-drawable-map',
    props: {
      path: {
        type: Array,
        default: function () { return [] }
      }
    },
    methods: {
      select (marker) {
        this.infoWinOpen = true
        this.infoWindowPos = marker.position
        this.infoContent = '<div class="infowindow-body">' +
          '<div class="name">' + marker.text + '</div>' +
          '</div>'
      },
      repositionMarkers () {
        if (this.path.length === 1) {
          this.markers = [{
            icon: {
              labelOrigin: {x: 15, y: 40},
              url: '/static/imgs/mapiconA2x.png',
              scaledSize: {width: 20, height: 34},
            },
            'position': this.path[0],
          }]
        } else {
          this.markers = [{
            'text': 'Start',
            icon: {
              labelOrigin: {x: 15, y: 40},
              url: '/static/imgs/mapiconA2x.png',
              scaledSize: {width: 20, height: 34},
            },
            'position': this.path[0],
          },
          {
            'text': 'Finish',
            icon: {
              labelOrigin: {x: 15, y: 40},
              url: '/static/imgs/mapiconA2x.png',
              scaledSize: {width: 20, height: 34},
            },
            'position': this.path[this.path.length - 1]
          }]
        }
      },
      updatePath (event) {
        this.path = event.b
        this.repositionMarkers()
        this.$emit('route_changed', this.path)
      },
      placePolylinePoint (obj) {
        this.path.push(obj.latLng)
        this.repositionMarkers()
      },
      handleClickForDelete ($event) {
        if ($event.vertex) {
          this.$refs.polyline.$polylineObject.getPath().removeAt($event.vertex)
        }
      },
      setVertexAsAidStation ($event) {
        console.log('Aid station', $event) // todo: implement this.
      },
      getElevationsForPath () {
        if (this.elevationService) {
          this.elevationService.getElevationForLocations({
            'locations': this.path
          }, (results, status) => {
            console.log('Elevation Service', results, this.path)
            for (var k = 0; k < results.length; k++) {
              this.$set(this.path[k], 'elevation', results[k].elevation)
              console.log('Lat', this.path[k].lat, typeof this.path[k].lat)
              // this.path[k].lat = this.path[k].lat()
              // this.path[k].lng = this.path[k].lng()
            }
          })
        }
      }
    },
    mounted () {
      this.elevationService = new window.google.maps.ElevationService()
    },
    computed: {
      center () {
        return (this.$store.state.user.address || {}).coordinates || {lat: 39.82, lng: -106.58}
      },
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
        markers: [],
        elevation: [],
        elevationService: null,
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
