<template>
  <div class="actions">
    <RaceRegister ref="reg" />
    <RaceCancel ref="cancel" />
    <div v-if="showRegister">
      <button v-if="isRegistered(race) && isAvailable(race)" class="hollow" @click="cancel(race)">Cancel</button>
      <div v-else-if="isRegistered(race)"></div>
      <button v-else-if="isAvailable(race)" class="hollow" @click="register(race)">Register</button>
      <button v-else class="hollow" disabled="disabled">Finished</button>
    </div>
    <i @click="toggleFavorite(race._id)" style="position:relative;top:5px;" class=" fa fa-2x fa-heart-o" :class="{  'favorite' : isFavorite(race), 'not-favorite': !isFavorite(race) }" aria-hidden="true"></i>
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
  props: {
    showRegister: {
      type: Boolean,
      default: false
    },
    race: {
    },
  }
}
</script>
<style scoped>
.actions > * {
  margin-right: 8px;
  font-size: 20px;
  display: inline-block;
  margin: -4px 5px;
  float: right;
}
i.favorite {
  color: #0DFFAE;
}
i.not-favorite {
  color: #D8D8D8;
}
</style>
<style>
.favorite {
  color: #0DFFAE;
}
@media screen and (max-width: 799px) {
  div.actions .actions {
    margin: 0px 5px;
  }
  div.actions > i.fa {
    margin: -4px 0px;
  }
}
</style>
