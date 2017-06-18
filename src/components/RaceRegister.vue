<template>
  <modal classes="rp-modal" :adaptive="true" :height="200" :width="750" name="register">
    <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('register')"><span aria-hidden="true">&times;</span></button>
    <h3>Confirm you’re ready to commit to running {{race.name}}</h3>
    <label for="distance">Distance:</label>
    <select name="distance" v-model="selected_distance">
      <option v-for="course in race.courses" :value="course.distance">
        {{ course.distance }}
      </option>
    </select>
    <br/>
    <br/>
    <button @click="registerForRace()">Confirm</button>
  </modal>
</template>

<script>
export default {
  name: 'race-register',
  computed: {
    race () {
      if (this.$store.state.selectedRace && this.$store.state.selectedRace.courses) {
        this.selected_distance = this.$store.state.selectedRace.courses[0].distance
      }
      return this.$store.state.selectedRace
    }
  },
  data () {
    return {
      selected_distance: '',
    }
  },
  methods: {
    show () {
      this.$modal.show('register')
    },
    registerForRace () {
      this.$store.dispatch('registerForRace', {
        'race': this.race,
        'distance': this.selected_distance
      })
      this.$modal.hide('register')
    }
  }
}
</script>

<style scoped>
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
    padding: 40px;
    text-align: center;
  }
</style>
