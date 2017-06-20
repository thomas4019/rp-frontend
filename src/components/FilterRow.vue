<template>
  <div class="filter-row">
    <div id="filter-distance" class="filter" @click="showRacePopup($event)">
      <div class="name">Distance</div>
      <div class="summary">{{distances[0]}} - {{distances[1]}}</div>
      <div class="popup" v-if="popup == 'distance'">
        <br/><br/>
        <vue-slider @change="updateFilter()" ref="slider" v-model="distances" :data="data" :tooltip="tooltip" :process-style="processStyle" :piecewise-style="piecewiseStyle" :piecewise="true" :piecewise-label="true" />
      </div>
    </div>
    <div id="filter-dates" class="filter" style="width:230px;">
      <div class="name">Dates</div>
      <div class="summary">
        <datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" v-model="start_date"></datepicker> - 
        <datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" v-model="end_date"></datepicker>
      </div>
    </div>
    <div id="filter-state" class="filter">
      <div class="name">State</div>
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
    <div class="filter" style="width:110px;">
      <div class="name">Mode</div>
      <div id="switcher">
        <img src="/static/imgs/GreenPin.png" @click="changeMode('map')" />
        <img src="/static/imgs/Menu.png"  @click="changeMode('list')" />
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
      this.$store.commit('updateSearchMode', _mode)
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
    start.setDate(start.getDate())
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
    }
  }
}
</script>

<style scoped>
  .filter-row {
    position: relative;
    display: flex;
    border-radius: 5px;
    border: 0.5px solid #9B9B9B;
    width: 680px;
    margin: 20px auto 0px auto;
  }
  .filter {
    position: relative;
    padding: 5px;
    border-left: 0.5px solid #9B9B9B;
    min-width: 150px;
  }
  .filter:first-child {
    border-left: none;
  }
  .name {
    color: #9B9B9B;
  }
  .summary {
    color: #0DFFAE;
  }
  #filter-distance .summary {
    margin-top: 4px;
  }
  #filter-dates .summary {
    margin-top: -2px;
  }
  #filter-state select {
    margin-top: -1px;
  }
  .filter .popup {
    position: absolute;
    padding: 10px 15px;
    top: 30px;
    left: -5px;
    width: 227px;
    background-color: #323237 !important;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.5);
    border-radius: 4px;
    z-index: 100;
  }
</style>
<style>
  .date-picker-wrapper {
    clear: none;
    display: inline-block;
  }
  .date-picker {
    background: transparent;
    color: #0DFFAE !important;
    font-size: 14px;
    width: 90px;
    padding: 5px; 
    position: relative;
  }
  .date-picker * {
    z-index:100;
  }
  .date-picker:focus {
    outline: none;
  }
  .vdp-datepicker__calendar {
    background-color: #323237 !important;
  }
  select {
    background: transparent;
    color: #0DFFAE;
    border: none;
    padding: 5px;
  }
  option {
    background-color: #323237;
    color: #0DFFAE;
  }
  #switcher img {
    height: 40px;
  }
</style>
