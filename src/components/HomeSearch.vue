<template>
  <div id="home-search">
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

<style>
#home-search {
  max-width: 1000px;
  margin: auto;
}
#switcher {
  text-align: right;
}
#switcher img {
  height: 42px;
}
</style>
