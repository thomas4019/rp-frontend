<template>
  <div id="race-search">
    <FilterRow />
    <div id="switcher">
      <img src="/static/imgs/GreenPin.png" @click="mode='map'" />
      <img src="/static/imgs/Menu.png"  @click="mode='list'" />
    </div>
    <RpMap v-if="mode == 'map'"/>
    <RaceList v-if="mode != 'map'" />
  </div>
</template>

<script>
import RpMap from '@/components/Map'
import RaceList from '@/components/RaceList'
import FilterRow from '@/components/FilterRow'
import RaceRegister from '@/components/RaceRegister'
export default {
  name: 'race-search',
  components: {
    RpMap,
    RaceList,
    FilterRow,
    RaceRegister
  },
  data () {
    return {
      mode: 'list'
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
