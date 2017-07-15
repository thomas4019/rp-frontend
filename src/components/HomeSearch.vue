<template>
  <div id="home-search" class="container">
    <HomeFilterRow />
    <RpMap v-if="mode == 'map'"/>
    <RaceSearchList v-if="mode != 'map'" />
  </div>
</template>

<script>
import RpMap from '@/components/Map'
import RaceSearchList from '@/components/RaceSearchList'
import HomeFilterRow from '@/components/HomeFilterRow'
export default {
  name: 'home-search',
  components: {
    RpMap,
    RaceSearchList,
    HomeFilterRow
  },
  computed: {
    mode () {
      return this.$store.state.homeSearchMode || 'map'
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 799px) {
  #home-search {
    width: 100%;
  }
  #home-search .filter-row {
    //margin: 0px 19px;
  }
}
</style>

<style>
#home-search {
  max-width: 830px;
  margin: auto;
  margin-bottom: 55px;
}
#switcher {
  text-align: right;
}
#switcher img {
  height: 42px;
}
</style>
