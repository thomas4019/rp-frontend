<template>
  <div class="filter-row">
    <div class="filter" style="width:345px;">
      <div class="summary"><i class="fa fa-search" aria-hidden="true"></i><input @change="searchUpdate()" @keyup="searchUpdate()" v-model="search_text" type="text" placeholder="Search races, locations" class="nameless"></div>
    </div>
    <div class="filter" style="width:120px;" @click="showRacePopup($event)">
      <div class="name">Distance</div>
      <div class="summary">{{distances[0]}} - {{distances[1]}}</div>
      <div class="popup" v-if="popup == 'distance'">
        <br/><br/>
        <vue-slider @change="updateFilter()" ref="slider" v-model="distances" :data="data" :tooltip="tooltip" :process-style="processStyle" :piecewise-style="piecewiseStyle" :piecewise="true" :piecewise-label="true" />
      </div>
    </div>
    <div class="filter" style="width:150px;">
      <div class="name">Dates</div>
      <div class="summary">
        <datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" format="M/d/yyyy" v-model="start_date"></datepicker> - 
        <datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" format="M/d/yyyy" v-model="end_date"></datepicker>
      </div>
    </div>
    <div class="filter" style="width:140px;">
      <div class="name">Location</div>
      <select v-model="filter_state" @change="updateFilter()">
        <option value="ALL">All</option>
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
    <div class="filter" style="width:70px;">
      <div id="switcher">
        <img src="/static/imgs/pin.png" @click="changeMode('map')" />
        <img src="/static/imgs/list.png"  @click="changeMode('list')" />
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import vueSlider from 'vue-slider-component'
function onBodyClick () {
  this.popup = 'none'
}
export default {
  name: 'filter-row',
  components: {
    Datepicker,
    vueSlider
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
    changeMode (_mode) {
      this.$store.commit('updateHomeSearchMode', _mode)
    },
    searchUpdate () {
      this.$store.commit('search', this.search_text)
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
        'backgroundColor': '#0DFFAE',
      },
      piecewiseStyle: {
        'backgroundColor': '#ccc',
        'visibility': 'visible',
        'width': '12px',
        'height': '12px'
      },
      distances: ['1K', '26.2 mile'],
      filter_state: 'ALL',
      search_text: ''
    }
  }
}
</script>
<style scoped>
.filter-row {
  position: relative;
  display: flex;
  border: 0.5px solid #4A4A4A;
  width: 830px;
  margin: 20px auto 10px auto;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.25);
}
.filter {
  position: relative;
  padding: 5px 10px 5px 10px;
  padding-bottom: 0px;
  border-left: 0.5px solid #4A4A4A;
  min-width: 80px;
}
.filter:first-child{
    padding: 4px 10px 4px 15px;
}
.filter:first-child, 
.filter:nth-child(2) {
  border-left: none;
}
.name {
  color: #9B9B9B;
  font-size: 12px;
  line-height: 16px;
  padding: 2px 0px 0px 0px;
}
.summary {
  color: #0DFFAE;
  font-size: 12px;
}
.summary i.fa {
  color: #9B9B9B;
  font-size: 1.2em;
}
.filter .popup {
  position: absolute;
  padding: 10px 15px;
  top: 30px;
  left: -5px;
  width: 227px;
  background-color: #323237;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.5);
  border-radius: 4px;
  z-index: 100;
}
input[type=text] {
  background: transparent;
  color: #F7F7F7;
  border: none;
  font-size: 14px;
  width: 90%;
}
input:focus {
    outline:none;
}
input[type=text]::placeholder {
  color: #F7F7F7;
}
#switcher {
  padding: 5px 0px 0px 0px;
}
#switcher img {
  height: 22px;
  padding: 0px 4px 0px 0px;
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
}
</style>
<style>
  .date-picker-wrapper {
    clear: none;
    display: inline-block;
  }
  .date-picker {
    background: transparent;
    color: #0DFFAE;
    font-size: 12px;
    width: 50px;
    padding: 0px 0px 0px 0px; 
    position: relative;
  }
  .date-picker * {
    z-index:100;
  }
  .date-picker:focus {
    outline: none;
  }
  .vdp-datepicker__calendar {
    background-color: #323237;
    border: none;
  }
  select {
    background: transparent;
    color: #0DFFAE;
    border: none;
    padding: 0px 5px 0px 5px; 
    margin-left: -5px;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:none;
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  option {
    background-color: #323237;
    color: #0DFFAE;
  }
  .vdp-datepicker__calendar header {
    border: none;
  }
  .vdp-datepicker__calendar header .next:after{
      border-left: 10px solid #9B9B9B;
  }
  .vdp-datepicker__calendar header .prev:after {
    border-right: 10px solid #9B9B9B;
  }
</style>
