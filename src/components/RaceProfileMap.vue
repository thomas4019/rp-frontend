<template>
  <div>
    <gmap-map
      :options="{styles: styles}"
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 100%"
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
        :key="marker"
        :position.sync="marker.position"
        :clickable="true"
        :icon="marker.icon"
        :zIndex="5"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
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
  props: ['expo'],
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
          ' • ' + race.location.city + ', ' + race.location.state +
          '</div>' +
          '</div>'
      }
    },
  },
  computed: {
    center () {
      return {lat: this.expo.lat, lng: this.expo.lng}
    },
    marker () {
      return {
        icon: {
          labelOrigin: {x: 15, y: 40},
          url: '/static/imgs/mapiconA2x.png',
          scaledSize: {width: 15, height: 25.5},
        },
        'position': this.center
      }
    }
  },
  data () {
    return {
      styles: MapStyles,
      zoom: 14,
      selected: '',
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
    }
  }
}
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
