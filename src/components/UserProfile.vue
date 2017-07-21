<template>
<div>
  <section id="profile-info" class="container">
    <div id="profile-left">
      <div id="profile-photo-frame">
        <img id="profile-photo" v-bind:src="photo" />
      </div>
    </div>
    <div id="profile-right">
      <h1>{{user.first_name}} {{user.last_name}}</h1>
      <dl>
        <dt>Details</dt>
        <dd>{{age}}, <span id="profile-gender">{{user.gender}}</span></dd>
      </dl>
      <dl>
        <dt>Current City</dt>
        <dd>{{user.address.city}}, {{user.address.state}}</dd>
      </dl>
      <dl>
        <dt>2017 Races</dt>
        <dd></dd>
      </dl>
      <dl>
        <dt>Pass Type</dt>
        <dd v-if="passName">{{passName}}</dd>
        <dd v-if="!passName">None <router-link to="/app/payment"><em>Buy a pass now</em></router-link></dd>
      </dl>
      <dl>
        <dt>Race Credits</dt>
        <dd>{{user.race_credits}}</dd>
      </dl>
    </div>
  </section>

  <section id="registered-races" style="margin-top: 10px;" class="container">
    <h3 style="float: left;">Registered Races</h3>
    <router-link to="search" class="button" style="margin: 0px 0px 0px 15px;" >Add race</router-link>
    <race-table :showRegister="true" v-bind:races="registered_races"/>
  </section>

  <section v-if="completed_races.length" id="completed-races" style="margin-top: 10px;" class="container">
    <h3 style="float: left;">Completed Races</h3>
    <race-table :showRegister="true" v-bind:races="completed_races"/>
  </section>

  <section v-if="favorite_races.length" id="favorite-races" class="container">
    <h3>Race Wishlist</h3>
    <race-table :showRegister="true" v-bind:races="favorite_races" v-bind:action="test"/>
  </section>

  <section id="upcoming-races" class="container">
    <h3>Suggested Races Near You</h3>
    <race-table :showRegister="true" v-bind:races="upcoming_races" v-bind:action="test"/>
  </section>

  <div class="callout-small">
    Can't find the race you're looking for? <a href="mailto:support@racepass.com"><em>Let us know!</em></a>
  </div>

</div>

</template>
<script>
import rp from '../rp'
import RaceTable from '@/components/RaceTable'
export default {
  name: 'user-profile',
  components: {
    'race-table': RaceTable
  },
  asyncComputed: {
    favorite_races: {
      get () {
        // return new Promise((resolve, reject) => {
        var favorites = Object.keys(this.favorites).filter((id) => this.favorites[id])
        if (!favorites.length) {
          return []
        }
        var query = {'_id': {'$in': favorites}}
        return rp.get('race2?query=' + JSON.stringify(query))
      },
      default: []
    }
  },
  mounted () {
    if (!this.$store.state.user || !this.$store.state.user.first_name) {
      this.$router.push('/app/useredit')
    }
  },
  computed: {
    favorites () {
      return this.$store.state.favorites
    },
    user () {
      if (this.$store.state.user && this.$store.state.user.first_name) {
        return this.$store.state.user
      }
      // Return a dummy object to use until the real user is ready.
      return { address: { city: '', state: '', coordinates: {} }, race_listings: [] }
    },
    passName () {
      return rp.passNames[this.user.passType]
    },
    age () {
      return rp.calculateAge(new Date(this.user.date_of_birth))
    },
    photo () {
      return this.$store.state.photo
    },
    registered_races () {
      var now = new Date().toISOString()
      return this.user.race_listings.filter(function (race) {
        return race.datetime > now
      })
    },
    completed_races () {
      var now = new Date().toISOString()
      return this.user.race_listings.filter(function (race) {
        return race.datetime <= now
      })
    },
    cancel_cutoff () {
      var cutoff = new Date()
      cutoff.setDate(cutoff.getDate() + 1)
      return cutoff.toISOString()
    },
    racesLeft () {
      if (this.user.passType === 'unlimited') {
        return 'unlimited'
      } else {
        return rp.passRaceCount[this.user.passType] - this.user.race_listings.length
      }
    },
    upcoming_races () {
      return this.$store.state.suggestedRaces
    }
  },
  data () {
    return {
      test: function () {
        alert(123)
      }
    }
  }
}
</script>

<style scoped>
#profile-info {
	display: flex;
	margin-top: 15px;
}
#profile-left {
	width: 200px;
	clear: none;
}
#profile-photo-frame {
	height: 150px;
	width: 150px;
	border-radius: 75px;
	margin: 25px;
	overflow: hidden;
}
#profile-photo {
	width: 150px;
	min-height: 150px;
	border-radius: 75px;
}

#profile-info h1 {
	margin: 10px 0px;
}
#profile-right dl {
	margin: 3px;
}
#profile-right dt {
	display: inline-block;
	width: 100px;
	color: #ABAEB7;
}
#profile-right dd {
	display: inline-block;
}
#profile-gender {
	text-transform: capitalize;
}

section {
  margin-bottom: 20px;
}
</style>
