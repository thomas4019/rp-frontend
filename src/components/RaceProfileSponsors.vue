<template>
  <section class="line-below" v-if="sponsors.length">
    <h3>Event sponsors</h3>
    <img class="race-profile-picture" src="/static/imgs/profiles/default-race-partner.png">
  </section>
</template>

<script>
export default {
  name: 'race-profile-sponsors',
  props: {
    sponsors: {
      type: Array,
      default: []
    }
  },
}
</script>

<style scoped>

</style>
