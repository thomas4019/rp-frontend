<template>
 <section class="container">
    <div style="display:none">{{search_text}}</div>
    <RaceTable :races="races" />
    <div id="navigation">
      Showing page {{page + 1}} of {{page_count}}
      <button @click="prev()">Prev</button>
      <button @click="next()">Next</button>
    </div>
  </section>
</template>

<script>
import rp from '../rp'
import RaceTable from '@/components/RaceTable'

export default {
  name: 'race-search-list',
  components: {
    RaceTable
  },
  methods: {
    update () {
      var query = {
        status: 'visible',
        $and: [],
        datetime: {
          $nin: ['', 'TBD']
        }
      }
      Object.assign(query, this.$store.state.filters)
      if (!query['location.state']) {
        delete query['location.state']
      }
      this.$store.state.search_text.split(' ').forEach(function (word) {
        query['$and'].push({'name': {'$regex': word, '$options': 'i'}})
      })
      var orderby = {
        'datetime': 1
      }
      rp.get('race2?limit=' + this.limit + '&page=' + this.page + '&query=' + JSON.stringify(query) + '&orderby=' + JSON.stringify(orderby))
        .then((result) => {
          if (result.pages !== this.page_count) {
            this.page = 0
          }
          this.page_count = result.pages
          this.races = result.data
          this.races.forEach((race) => {
            race.is_favorite = this.$store.state.favorites[race._id]
            race.is_available = (race.datetime > new Date().toISOString())
          })
        })
    },
    prev () {
      if (this.page > 0) {
        this.page--
        this.update()
      }
    },
    next () {
      if (this.page < this.page_count - 1) {
        this.page++
        this.update()
      }
    }
  },
  computed: {
    search_text () {
      if (this.prev_search !== this.$store.state.search_text) {
        this.page = 0
      }
      this.prev_search = this.$store.state.search_text
      this.update()
      return this.$store.state.search_text
    }
  },
  mounted () {
    this.update()
  },
  data () {
    return {
      races: [],
      page: 0,
      page_count: 1,
      limit: 10,
      prev_search: '',
    }
  }
}
</script>

<style scoped>
#navigation {
  text-align: right;
  padding: 5px 50px 10px 10px;
}
</style>
