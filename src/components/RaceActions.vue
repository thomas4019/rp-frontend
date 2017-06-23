<template>
  <div class="actions">
    <RaceRegister ref="reg" />
    <RaceCancel ref="cancel" />
    <button v-if="isRegistered(race) && isAvailable(race)" class="hollow" @click="cancel(race)">Cancel</button>
    <div v-else-if="isRegistered(race)"></div>
    <button v-else-if="isAvailable(race)" class="hollow" @click="register(race)">Register</button>
    <button v-else class="hollow" disabled="disabled">Finished</button>
    <i @click="toggleFavorite(race._id)" style="position:relative;top:5px;" class="favorite fa fa-2x" :class="{  'fa-heart' : isFavorite(race), 'fa-heart-o': !isFavorite(race) }" aria-hidden="true"></i>
    <!--<a style="position:relative;top:4px;" href="https://www.facebook.com/sharer/sharer.php?u=example.org&p[summary]=YOUR_DESCRIPTION">
      <i class="favorite fa fa-share-alt fa-2x" aria-hidden="true"></i>
    </a>-->
  </div>
</template>

<script>
import RaceRegister from '@/components/RaceRegister'
import RaceCancel from '@/components/RaceCancel'
export default {
  name: 'race-actions',
  components: {
    RaceRegister,
    RaceCancel
  },
  methods: {
    isSelectedDistance (race, course) {
      var matching = this.$store.state.user.race_signups.filter((rs) => rs.race_id === race._id)
      if (!matching.length) {
        return false
      }
      return course.distance === matching[0].distance
    },
    isRegistered (race) {
      var ids = this.$store.state.user.race_listings.map((r) => r._id)
      return ids.includes(race._id)
    },
    isFavorite (race) {
      return this.$store.state.favorites[race._id]
    },
    isAvailable (race) {
      return (race.datetime > new Date().toISOString())
    },
    toggleFavorite (_id) {
      if (this.$store.state.favorites[_id]) {
        this.$store.commit('unfavorite', _id)
      } else {
        this.$store.commit('favorite', _id)
      }
    },
    register (race) {
      this.$refs.reg.show()
      this.$store.commit('selectRace', race)
    },
    cancel (race) {
      this.$store.commit('selectRace', race)
      this.$refs.cancel.show()
    }
  },
  props: ['race']
}
</script>

<style>
.favorite {
  color: #0DFFAE;
}
.actions > * {
  margin-right: 8px;
}
</style>
