<template>
  <div id="race-search">
    <div class="container">
      <FilterRow />
    </div>
    <br/>
    <RpMap v-if="mode == 'map'"/>
    <RaceSearchList v-if="mode != 'map'" />
  </div>
</template>

<script>
import RpMap from '@/components/Map'
import RaceSearchList from '@/components/RaceSearchList'
import FilterRow from '@/components/FilterRow'
import RaceRegister from '@/components/RaceRegister'
export default {
  name: 'race-search',
  components: {
    RpMap,
    RaceSearchList,
    FilterRow,
    RaceRegister
  },
  computed: {
    mode () {
      return this.$store.state.searchMode
    }
  }
}
</script>

<style>
#race-search {
  width: 100%;
  margin: auto;
}
#switcher {
  text-align: right;
}
#switcher img {
  height: 50px;
}
</style>
