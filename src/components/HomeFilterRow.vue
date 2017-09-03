<template>
<div class="#filters">
  <div class="row">
    <div class="col">
      <div class="filter-row">
        <div class="hide-on-desktop container">
          <div class="row">
            <div @click="expandSeachDropdown()" class="col condensed-filter-bar">
              <img class="search" src="/static/imgs/light_search_icon.png"/>
              <span>{{distances[0] == data[0] && distances[1] == data[data.length-1] ? 'Any distance' : distances[0] + ' - '+ distances[1]}}</span>
              <span class="bullet"></span>
              <span v-if="filter_state==='ALL'">Anywhere</span>
              <span v-else>{{filter_state}}</span>
              <span class="bullet"></span>
              <span v-if="start_date == original_start_date && end_date == original_end_date">Anytime</span>
              <span v-else>{{start_date | formatDate}} - {{end_date | formatDate}}</span>
              <img src="/static/imgs/pin.png" @click="changeMode('map')" />
              <img src="/static/imgs/list.png"  @click="changeMode('list')" />
            </div>
          </div>
        </div>
        <div class="row hide-on-mobile">
          <div class="filter col">
            <!-- <div class="summary">
              <img class="search" src="/static/imgs/light_search_icon.png"/>
              <input @change="searchUpdate()" @keyup="searchUpdate()" v-model="search_text" type="text" placeholder="Search races or locations" class="nameless">
            </div> -->

          <div class="summary">
            <div class="input-group nameless">
              <span class="input-group-addon" style="padding: 10px 0px 0px 0px;"><img class="search" src="/static/imgs/light_search_icon.png"/></span>
              <input style="padding: 6px 0px 0px 10px;" @change="searchUpdate()" @keyup="searchUpdate()" v-model="search_text" type="text" placeholder="Search races or locations" class="form-control">
            </div>
          </div>

          </div>
          <div class="filter  col-md-2" style="width:120px;" @click="showRacePopup($event)">
            <div class="name">Distance</div>
            <div class="summary">{{distances[0] == data[0] && distances[1] == data[data.length-1] ? 'Any distance' : distances[0] + ' - '+ distances[1]}}</div>
            <div class="popup" v-if="popup == 'distance'">
              <br/><br/>
              <vue-slider @change="updateFilter()" ref="slider" v-model="distances" :data="data" :tooltip="tooltip" :process-style="processStyle" :piecewise-style="piecewiseStyle" :piecewise="true" :piecewise-label="true" />
            </div>
          </div>
          <div class="filter  col-md-2">
            <div class="name">Where</div>
            <select v-model="filter_state" @change="updateFilter()">
              <option value="ALL">Anywhere</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div class="filter  col-md-3">
            <div class="name">When</div>
            <div class="summary" v-if="showDatePickers">
              <datepicker  wrapper-class="date-picker-wrapper" input-class="date-picker" format="M/d/yy" v-model="start_date"></datepicker> - 
              <datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" format="M/d/yy" v-model="end_date"></datepicker>
            </div>
            <div class="summary" v-else>
              <span v-if="start_date == original_start_date && end_date == original_end_date" @click="showDates()">Anytime</span>
            </div>
          </div>
        </div>
        <MobileFilterDropdown :filter_state.sync="filter_state" ref="mobileSearch"></MobileFilterDropdown>
      </div>
    </div>


    <div class="col-1"  v-if="showListSwitcher">
      <div class="filter-row" style="width: 100%">
        <div class="switcher row no-gutters">
          <div class="filter col-md-6" >
            <img src="/static/imgs/icons/filter/map.png" @click="changeMode('map')" />
          </div>
          <div class="filter  col-md-6">
            <img src="/static/imgs/icons/filter/list.png"  @click="changeMode('list')" />
          </div>
        </div>
        <!-- <div id="switcher">
            <img src="/static/imgs/icons/filter/map.png" @click="changeMode('map')" />
            <img src="/static/imgs/icons/filter/list.png"  @click="changeMode('list')" />
          </div> -->
      </div>
    </div>
  </div>


</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import vueSlider from 'vue-slider-component'
import MobileFilterDropdown from '@/components/MobileFilterDropdown'

function onBodyClick () {
  this.popup = 'none'
}
export default {
  name: 'filter-row',
  components: {
    Datepicker,
    vueSlider,
    MobileFilterDropdown
  },
  props: {
    showListSwitcher: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showRacePopup ($event) {
      this.popup = 'distance'
      $event.stopPropagation()
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
    showDates () {
      this.showDatePickers = true
    },
    changeMode (_mode) {
      this.$store.commit('updateHomeSearchMode', _mode)
    },
    searchUpdate () {
      this.$store.commit('search', this.search_text)
    },
    expandSeachDropdown () {
      this.$refs.mobileSearch.openDropdown()
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
      popup: 'none',
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      original_start_date: start.toISOString(),
      original_end_date: end.toISOString(),
      end_hidden: false,
      start_hidden: false,
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
      processStyle: {
        'backgroundColor': '#0FDA96',
      },
      piecewiseStyle: {
        'backgroundColor': '#ccc',
        'visibility': 'visible',
        'width': '12px',
        'height': '12px'
      },
      distances: ['1K', '26.2 mile'],
      filter_state: 'ALL',
      search_text: '',
      showDatePickers: false,
    }
  }
}
</script>
<style scoped>
.filter-row {
  border: 1px solid #D8D8D8;
  margin: 0px auto 10px auto;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.15);
}
.filter {
  padding: 5px 10px 0px 10px;
  border-left: 1px solid #9B9B9B;
  text-align: left;
}
.filter:first-child {
    padding: 4px 10px 10px 15px;
}
.filter:first-child {
  border-left: none;
}
.name {
  color: #323237;
  font-size: 14px;
  line-height: 19px;
  font-weight: 900;
  padding: 2px 0px 0px 0px;
  text-align: left;
}
.summary {
  font-size: 15px;
  font-weight: 900;
  text-align: left;
  color: #0FDA96;
}
.summary i.fa {
  color: #D8D8D8;
  font-size: 1.2em;
}
.summary .search {
  height: 25px;
  margin-top: -3px;
  padding-left: 10px;
}
.filter .popup {
  position: absolute;
  padding: 10px 15px;
  top: 30px;
  left: -5px;
  width: 227px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.5);
  border-radius: 4px;
  z-index: 100;
}
input[type=text] {
  background: transparent;
  color: #0FDA96;
  border: none;
  font-size: 15px;
  line-height: 20px;
  font-weight: 900;
  width: 85%;
}
.nameless {
  padding: 8px 0px 0px 0px;
}
input:focus {
    outline:none;
}
input[type=text]::placeholder {
  color: #0FDA96;
}
.switcher .filter {
  text-align: center;
  padding: 16px 0px 13px 0px
}
.switcher img {
  height: 25px;
}
.condensed-filter-bar {
  font-size: 12px;
  font-weight: 300;
  color: #0DFFAE;
  padding: 7px 0px;
  text-align: center;
}
.condensed-filter-bar .bullet {
  margin: 0px 8px;
  width: 5px;
  height: 5px;
}
.condensed-filter-bar img {
  height: 20px;
  padding-left: 5px;
}
.filter select {
  font-size: 15px;
  padding-top: 2px;
}

@media screen and (max-width: 1100px) { 
    input[type=text] {
      width: 80%;
    }
}
@media screen and (max-width: 799px) {
  #home-search .filter-row{
    max-width: initial;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    margin-bottom: 18px;
  }
  .filter-row input,
  .filter-row input::placeholder {
    color: #0DFFAE;
    width: initial;
  }
  .filter {
    width: initial !important;
  }
  .filter .name {
    display: none;
  }
  .search {
    height: 18px;
    padding-right: 5px;
  }
}
</style>
<style>
.filter .date-picker {
  font-weight: 900;
  font-size: 16px;
}
</style>
