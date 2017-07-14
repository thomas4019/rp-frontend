<template>
<div class="mobile-search-dropdown" :class="{open: open}">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="menu row justify-content-between">
          <div class="col-4">
            <span class="close" @click="closeDropdown()"><img src="/static/imgs/thin_arrow.png" /></span>
          </div>
          <div class="col-4">
            <span class="clear" @click="clearFilters()">Clear filters</span>
          </div>
        </div>
        <div class="mobile-filter-option" :class="{solo: distanceOpen}">
          <div class="rp-border mobile-filter-non-solo"  @click="distanceOpen=true">
            <span class="mobile-filter-icon"><img src="/static/imgs/race.png" /></span>
            <div class="mobile-filter-summary">{{distances[0] == data[0] && distances[1] == data[data.length-1] ? 'Any Distance' : distances[0] + ' - '+ distances[1]}} </div>
          </div>
          <div class="mobile-filter-solo container">
            <div class="row justify-content-center">
              <div class="col">
                <span class="close" @click="distanceOpen=false">x</span>
                <h3 class="centered">Distance</h3>
                <vue-slider
                  @change="updateFilter()" 
                  ref="slider" 
                  v-model="distances" 
                  :data="data" 
                  :tooltip="tooltip" 
                  :bg-style="bgStyle"
                  :process-style="processStyle" 
                  :piecewise-style="piecewiseStyle" 
                  :piecewise-active-style="piecewiseActiveStyle"
                  :tooltip-style="tooltipStyle"
                  :label-style="labelStyle"
                  :label-active-style="labelActiveStyle"
                  :slider-style="sliderStyle"
                  :piecewise="true" 
                  :show="distanceOpen"
                  :lazy="true"
                  :piecewise-label="true" />
                <button class="hollow shadowed rounded"  @click="distanceOpen=false">Add filter</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mobile-filter-option" :class="{solo: locationOpen}">
          <div class="rp-border mobile-filter-non-solo"  @click="locationOpen=true">
            <span class="mobile-filter-icon"><img src="/static/imgs/discover.png" /></span>
            <div class="mobile-filter-summary">{{filter_state == 'ALL'? 'Search city, zip code, state or country' : filter_state}} </div>
          </div>
          <div class="mobile-filter-solo container">
            <div class="row justify-content-center">
              <div class="col">
                <span class="close" @click="locationOpen=false">x</span>
                <h3 class="centered">Location</h3>
                <div class="mobile-filter-summary">
                  <gmap-autocomplete
                    class="location-autocomplete rp-border"
                    :value="address"
                    :placeholder="'Search city, zip code, state or country'"
                    @place_changed="setAddress">
                  </gmap-autocomplete>
                </div>
                <button class="hollow shadowed rounded"  @click="locationOpen=false">Add filter</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mobile-filter-option" :class="{solo: dateOpen}">
          <div class="rp-border mobile-filter-non-solo"  @click="dateOpen=true">
            <span class="mobile-filter-icon"><img src="/static/imgs/register.png" /></span>
            <div class="mobile-filter-summary">
              <span v-if="start_date == original_start_date && end_date == original_end_date">Anytime</span>
              <span v-else>{{ start_date | formatDate }} - {{ end_date | formatDate }}</span>
            </div>
            <!-- <div class="mobile-filter-summary">{{start_date == original_start_date && end_date == original_end_date? 'Anytime' : ( start_date | formatDate ) + ' - ' + end_date}} </div> -->
          </div>
          <div class="mobile-filter-solo container">
            <div class="row justify-content-center">
              <div class="col">
                <span class="close" @click="dateOpen=false">x</span>
                <h3 class="centered">Date Range</h3>
                <div class="mobile-filter-summary">
                  <div class="rp-border date">
                    <span>Starts</span>
                    <span><datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" format="M/d/yyyy" v-model="start_date"></datepicker></span>
                  </div>
                  <div class="rp-border date">
                    <span>Ends</span>
                    <span><datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" format="M/d/yyyy" v-model="end_date"></datepicker></span>
                  </div>
                </div>
                <button class="hollow shadowed rounded"  @click="dateOpen=false">Add filter</button>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col">
            <button class="hollow shadowed rounded search"  @click="dateOpen=false">Search</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Datepicker from 'vuejs-datepicker'
import vueSlider from 'vue-slider-component'
import moment from 'moment'

function onBodyClick () {
  this.popup = 'none'
}
export default {
  name: 'mobile-filter-row',
  components: {
    Datepicker,
    vueSlider
  },
  methods: {
    openDropdown () {
      this.open = true
    },
    closeDropdown () {
      this.open = false
    },
    clearFilters () {
      this.distances = ['1K', '26.2 mile']
      this.filter_state = 'ALL'
      this.search_text = ''
      this.address = ''
      this.start_date = this.original_start_date
      this.end_date = this.original_end_date
      this.updateFilter()
    },
    updateFilter () {
      var filter = {
        'location.state': this.filter_state === 'ALL' ? null : this.filter_state,
        'datetime': {
          '$gte': new Date(this.start_date).toISOString(),
          '$lte': new Date(this.end_date).toISOString()
        },
        '$and': [
          {'distance_km_min': {
            '$lte': this.dataKMs[this.distances[1]] + 1
          }},
          {'distance_km_max': {
            '$gte': this.dataKMs[this.distances[0]] - 1
          }}
        ]
      }
      this.$store.commit('filter', filter)
    },
    changeMode (_mode) {
      this.$store.commit('updateHomeSearchMode', _mode)
    },
    searchUpdate () {
      this.$store.commit('search', this.search_text)
    },
    setAddress (addressData) {
      console.log('Address', addressData)
      var country = ''
      var zip = ''
      var city = ''
      for (var i = 0; i < addressData.address_components.length; i++) {
        var obj = addressData.address_components[i]
        if (obj.types[0] === 'locality') { // city
          city = obj.long_name
        } else if (obj.types[0] === 'administrative_area_level_1') {
          this.filter_state = obj.long_name
        } else if (obj.types[0] === 'country') {
          country = obj.short_name
        } else if (obj.types[0] === 'postal_code') {
          zip = obj.long_name
        }
      }
      console.log(city, this.filter_state, country, zip)
      this.updateFilter()
    }
  },
  watch: {
    distances () {
      this.updateFilter()
    },
    start_date: function () {
      this.updateFilter()
    },
    end_date: function () {
      this.updateFilter()
    }
  },
  created () {
    document.getElementsByTagName('body')[0].addEventListener('click', onBodyClick.bind(this))
  },
  destroyed () {
    document.getElementsByTagName('body')[0].addEventListener('click', onBodyClick.bind(this))
  },
  data () {
    var start = new Date()
    start.setDate(start.getDate() - 365)
    var end = new Date()
    end.setDate(end.getDate() + 364)
    return {
      open: false,
      distanceOpen: false,
      locationOpen: false,
      dateOpen: false,
      mobileSearchOpen: false,
      popup: 'none',
      start_date: start.toISOString(),
      original_start_date: start.toISOString(),
      original_end_date: end.toISOString(),
      end_date: end.toISOString(),
      tooltip: 'always',
      dataKMs: {
        '1K': 1,
        '5K': 5,
        '15K': 15,
        '13.1 mile': 21.1,
        '26.2 mile': 42.2
      },
      data: [
        '1K',
        '5K',
        '15K',
        '13.1 mile',
        '26.2 mile',
      ],
      distanceValues: [0, 5, 10, 15, 21.09, 42.19],
      bgStyle: {
        'backgroundColor': '#4A4A4A',
      },
      processStyle: {
        'backgroundColor': '#0DFFAE',
      },
      piecewiseStyle: {
        'backgroundColor': '#4A4A4A',
        'visibility': 'visible',
        'width': '10px',
        'height': '10px',
      },
      piecewiseActiveStyle: {
        'backgroundColor': '#0DFFAE',
        'visibility': 'visible',
        'width': '10px',
        'height': '10px',
      },
      labelActiveStyle: {
        'color': '#0DFFAE',
      },
      labelStyle: {
        'color': '#4A4A4A',
      },
      sliderStyle: {
        'backgroundColor': '#0DFFAE',
      },
      tooltipStyle: {
        'backgroundColor': '#0DFFAE',
        'color': '#4A4A4A',
        'borderColor': '#0DFFAE'
      },
      distances: ['1K', '26.2 mile'],
      filter_state: 'ALL',
      search_text: '',
      address: ''
    }
  }
}
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('M/d/YY')
  }
})
</script>
<style scoped>
button.search {
  border: none;
}
.mobile-search-dropdown .menu {
  margin: 35px 0px;
}
.mobile-search-dropdown .menu .close {
  opacity: 1;
  float: left;
}
.mobile-search-dropdown .menu .close img{
  transform: rotate(180deg);
  height: 12px;
}
.mobile-search-dropdown .menu .clear {
  color: #9B9B9B;
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
  float: right;
}
.mobile-filter-icon {
  display: inline-block;
}
.mobile-filter-icon img {
  width: 25px;
}
.mobile-filter-summary {
  display: inline-block;
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
  color: #0DFFAE;
  //width: 100%;
}
.mobile-filter-summary .date {
  margin-bottom: 25px;
}
.mobile-search-dropdown {
  display: none;
  z-index: 99999;
  background-color: #22262B;
  width: 100%;
  height: 100%;
}
.mobile-search-dropdown.open {
  display: block;
  position: fixed;
  top: 0px;
}
.mobile-filter-solo {
  display: none;
  padding-top: 25px;
}
.mobile-filter-non-solo {
  margin-bottom: 25px;
}
.mobile-filter-option.solo .mobile-filter-solo .mobile-filter-summary{
  width: 100%;
}
.mobile-filter-option.solo .mobile-filter-solo {
  display: block;
}
.mobile-filter-option.solo .mobile-filter-non-solo {
  display: none;
}
.mobile-filter-solo .close {
  float:left;
  color: #0DFFAE;
  text-shadow: none;
  opacity: 1;
}
.mobile-filter-solo h3 {
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 300;
  line-height: 27px;
}
.mobile-search-dropdown button,
.mobile-filter-solo button {
  margin: 50px auto;
  text-align: center;
  display: block;
}
.location-autocomplete::placeholder {
  color: #0DFFAE;
}
.location-autocomplete {
  background: url(/static/imgs/discover.png) no-repeat scroll 0px 0px;
  width: 100%;
  padding-left: 40px;
  background-size: contain;
  font-size: 14px;
  font-weight: 300;
  line-height: 19px;
  color: #0DFFAE;
}
button.rounded {
  width: initial;
  height: initial;
  padding: 10px 50px;
  background-color: #323237;
  border-radius: 100px;
  font-weight: 300;
  line-height: 16px;
  font-size: 12px;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.3);
}
</style>

<style>
.pac-container {
  z-index: 100000;
  background-color: #22262B;
  border-radius: 3px;
  border: 1px solid #4A4A4A;
}
.pac-container:after {
  /* Disclaimer: not needed to show 'powered by Google' if also a Google Map is shown */
  background-image: none !important;
  height: 0px;
  padding: 0;
  margin: 0;
}
.pac-icon-marker {
  display: none;
}
.pac-item {
  border: none;
}
.pac-item span,
.pac-item-query {
  color: #9B9B9B;
  font-size: 14px;
  line-height: 19px;
  font-weight: 300;
}
.mobile-filter-summary .date-picker-wrapper input {
  width: 100%;
}
</style>
