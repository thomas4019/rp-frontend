<template>
 <section class="container">
    <div style="display:none">{{search_text}}</div>
    <RaceTable :races="races" />
    <div id="navigation">
      <span id="position">
        Showing page {{page + 1}} of {{page_count}}
      </span>
      <button @click="prev()">Prev</button>
      <span style="display: inline-block; width:0px;"></span>
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
        query['$and'].push({'terms': {'$regex': word, '$options': 'i'}})
      })
      var orderby = {
        'datetime': 1
      }
      var querytime = new Date()
      rp.get('race2?limit=' + this.limit + '&page=' + this.page + '&query=' + JSON.stringify(query) + '&orderby=' + JSON.stringify(orderby))
        .then((result) => {
          if (this.last_update_time > querytime) {
            return
          }
          this.last_update_time = querytime
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
      last_update_time: null,
    }
  }
}
</script>

<style scoped>
#navigation {
  text-align: right;
  padding: 15px 50px 20px 10px;
}
#position {
  padding-right: 12px;
}
</style>
