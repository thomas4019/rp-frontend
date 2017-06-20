<template>
  <modal classes="rp-modal register-modal" :adaptive="true" :height="390" :width="750" name="register">
    <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('register')"><span aria-hidden="true">&times;</span></button>
    <h3>Confirm you’re ready to commit to running <em>{{race.name}}</em> and choose your distance:</h3>
    <div id="option-container">
      <button :class="{'hollow': selected_distance!=course.distance}" class="distance-option" v-for="course in race.courses" @click="select_distance(course.distance)">{{course.distance}}</button>
    </div>
    <p>By clicking confirm, you certify that you have read and understand the
       registration terms and rules specific to the {{race.name}} found on their
       website and waive, discharge any future claims and release {{race.name}} from any liability.</p>
    <br/>
    <button @click="registerForRace()">Confirm</button>
  </modal>
</template>

<script>
import toastr from 'toastr'
export default {
  name: 'race-register',
  computed: {
    race () {
      /* if (this.$store.state.selectedRace && this.$store.state.selectedRace.courses) {
        this.selected_distance = this.$store.state.selectedRace.courses[0].distance
      } */
      return this.$store.state.selectedRace
    }
  },
  data () {
    return {
      selected_distance: '',
    }
  },
  methods: {
    select_distance (d) {
      this.selected_distance = d
    },
    show () {
      this.$modal.show('register')
    },
    registerForRace () {
      if (this.selected_distance) {
        this.$store.dispatch('registerForRace', {
          'race': this.race,
          'distance': this.selected_distance
        })
        this.$modal.hide('register')
        // this.selected_distance = ''
      } else {
        toastr.error('You need to select your distance to register.')
      }
    }
  }
}
</script>

<style scoped>
  #option-container {
    margin: 10px auto;
    width: 400px;
    text-align: center;
  }
  .distance-option {
    width: 125px;
    height: 54px;
    margin: 5px 4px;
    font-size: 20px;
    display: inline-block;
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
<style>
  .rp-modal {
    padding: 40px !important;
    text-align: center;
  }
  .register-modal {
    padding: 40px 60px !important;
  }
</style>
