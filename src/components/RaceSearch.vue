<template>
  <div id="race-search">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-8 col-lg-6">
        <section>
          <FilterRow />
        </section>
        <section>
          <RpMap v-if="mode == 'map'"/>
          <RaceSearchList :showRegister="true" v-if="mode != 'map'" />
        </section>
      </div>
    </div>
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
</style>
