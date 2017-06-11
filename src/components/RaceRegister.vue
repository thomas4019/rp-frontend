<template>
  <modal classes="rp-modal" :adaptive="true" :height="200" :width="750" name="register">
    <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('register')"><span aria-hidden="true">&times;</span></button>
    <h3>Confirm you’re ready to commit to running {{race.name}}</h3>
    <br/>
    <button @click="registerForRace()">Confirm</button>
  </modal>
</template>

<script>
export default {
  name: 'race-register',
  computed: {
    race () {
      return this.$store.state.selectedRace
    }
  },
  methods: {
    show () {
      this.$modal.show('register')
    },
    registerForRace () {
      this.$state.commit('registerForRace', this.$store.state.selectedRace)
    }
  }
}
</script>

<style>
  .rp-modal {
    padding: 40px;
    text-align: center;
  }
</style>
