<template>
  <div id="home-search">
    <FilterRow />
    <div id="switcher">
      <img src="../assets/GreenPin.png" @click="mode='map'" />
      <img src="../assets/Menu.png"  @click="mode='list'" />
    </div>
    <RpMap v-if="mode == 'map'"/>
    <RaceList v-if="mode != 'map'" />
  </div>
</template>

<script>
import RpMap from '@/components/Map'
import RaceList from '@/components/RaceList'
import FilterRow from '@/components/FilterRow'
export default {
  name: 'race-search',
  components: {
    RpMap,
    RaceList,
    FilterRow
  },
  data () {
    return {
      mode: 'list'
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
