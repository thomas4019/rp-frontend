<template>
  <section class="line-below" v-if="about">
    <h3>About the race</h3>
    <p>Picture yourself racing on the roadbed of the Golden Gate Bridge as the California sun breaks through San Francisco’s iconic maritime fog. Bursting from the Embarcadero’s waterfront start line at the break of dawn. Racing through towering eucalyptus and redwood trees in Golden Gate Park. Passing AT&T Park with its atmosphere of game day anticipation and the crack of the bat.
In our 40th year, join 27,000 runners to take on our 26.2 mile loop USATF certified course (we’re also a Boston Marathon Qualifier and Olympic Team Time Trials Qualifier race) and take yourself on a running tour of San Francisco.
    </p>
  </section>
</template>

<script>
export default {
  name: 'race-profile-about',
  props: {
    about: {
      type: String,
      default: null
    }
  },
}
</script>

<style scoped>

</style>
