<template>
  <section class="line-below" v-if="about">
    <h3>About the race</h3>
    <p>{{about}}
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
