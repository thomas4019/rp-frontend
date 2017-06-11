<template>
  <div class="filter-row">
    <div class="filter" @click="showRacePopup($event)">
      <div class="name">Distance</div>
      <div class="summary">{{distances[0]}} - {{distances[1]}}</div>
      <div class="popup" v-if="popup == 'distance'">
        <br/><br/>
        <vue-slider ref="slider" v-model="distances" :data="data" :tooltip="tooltip" :process-style="processStyle" :piecewise-style="piecewiseStyle" :piecewise="true" :piecewise-label="true" />
      </div>
    </div>
    <div class="filter" style="width:230px;">
      <div class="name">Dates</div>
      <div class="summary">
        <datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" v-model="start_date"></datepicker> - 
        <datepicker wrapper-class="date-picker-wrapper" input-class="date-picker" v-model="end_date"></datepicker>
      </div>
    </div>
    <div class="filter">
      <div class="name">State</div>
      <select>
        <option>Alabama</option>
        <option>Alaska</option>
        <option>Arizona</option>
        <option>Arkansas</option>
        <option>California</option>
        <option>Colorado</option>
        <option>Connecticut</option>
        <option>Delaware</option>
        <option>Florida</option>
        <option>Georgia</option>
        <option>Hawaii</option>
        <option>Idaho</option>
        <option>Illinois</option>
        <option>Indiana</option>
        <option>Iowa</option>
        <option>Kansas</option>
        <option>Kentucky</option>
        <option>Louisiana</option>
        <option>Maine</option>
        <option>Maryland</option>
        <option>Massachusetts</option>
        <option>Michigan</option>
        <option>Minnesota</option>
        <option>Mississippi</option>
        <option>Missouri</option>
        <option>Montana</option>
        <option>Nebraska</option>
        <option>Nevada</option>
        <option>New Hampshire</option>
        <option>New Jersey</option>
        <option>New Mexico</option>
        <option>New York</option>
        <option>North Carolina</option>
        <option>North Dakota</option>
        <option>Ohio</option>
        <option>Oklahoma</option>
        <option>Oregon</option>
        <option>Pennsylvania</option>
        <option>Rhode Island</option>
        <option>South Carolina</option>
        <option>South Dakota</option>
        <option>Tennessee</option>
        <option>Texas</option>
        <option>Utah</option>
        <option>Vermont</option>
        <option>Virginia</option>
        <option>Washington</option>
        <option>West Virginia</option>
        <option>Wisconsin</option>
        <option>Wyoming</option>
        <option>District of Columbia</option>
      </select>
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
      distances: ['1K', '26.2 mile']
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
    width: 600px;
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
</style>
<style>
  .date-picker-wrapper {
    clear: none;
    display: inline-block;
  }
  .date-picker {
    background: transparent;
    color: #0DFFAE;
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
    background-color: #323237;
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
</style>
