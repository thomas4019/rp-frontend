import { Line } from 'vue-chartjs'
export default Line.extend({
  props: ['route', 'options'],
  computed: {
    elevations () {
      return {
        datasets: [
          {
            label: 'Elevation (meters)',
            backgroundColor: '#62bf85',
            data: this.route.map((p) => { return p.elevation })
          }
        ],
        labels: ['Start'].concat(new Array(this.route.length - 2)).concat(['Finish'])
      }
    }
  },
  mounted () {
    this.renderChart(this.elevations, this.options)
  }
})
