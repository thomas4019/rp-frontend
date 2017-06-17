<template>
  <div id="home-search">
    <HomeFilterRow />
    <RpMap v-if="mode == 'map'"/>
    <RaceList v-if="mode != 'map'" />
  </div>
</template>

<script>
import RpMap from '@/components/Map'
import RaceList from '@/components/RaceList'
import HomeFilterRow from '@/components/HomeFilterRow'
export default {
  name: 'home-search',
  components: {
    RpMap,
    RaceList,
    HomeFilterRow
  },
  computed: {
    mode () {
      return this.$store.state.homeSearchMode || 'list'
    }
  },
  data () {
    return {
      // mode: 'list'
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
  height: 50px;
}
</style>
