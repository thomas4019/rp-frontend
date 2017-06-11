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
        <dd v-if="!passName">None <a href="" ng-click="buy()"><em>Buy a pass now</em></a></dd>
      </dl>
      <dl>
        <dt>Race Credits</dt>
        <dd>{{user.race_credits}}</dd>
      </dl>
    </div>
  </section>

  <section id="registered-races" class="container">
    <h3 style="float: left;">Registered Races</h3>
    <a href="#!/search" style="float: left; margin: 20px 0px 0px 15px;" ><button>Add race</button></a>
    <race-table v-bind:races="registered_races"/>
        <!--<td v-if="race.datetime >= cancel_cutoff" ng-click="cancel_popup($index)">
          <em style="cursor: pointer;">Cancel</em>
        </td>-->
  </section>

  <section id="upcoming-races" class="container">
    <h3>Suggested Races Near You</h3>
    <race-table v-bind:races="upcoming_races" v-bind:action="test"/>
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
    'race-table': RaceTable,
  },
  computed: {
    user () {
      console.log(this.$store.state.user)
      return this.$store.state.user || { address: { coordinates: {} }, race_listings: [] }
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
    favorite_races () {
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
    }
  },
  /* asyncComputed: {
    upcoming_races () {
      var user = this.$store.state.user
      if (!user) {
        return []
      }
      console.log(123)
      console.log(this.$store.state.user)
      var lat = user.address.coordinates.lat
      var lng = user.address.coordinates.lng
      return this.http.get('nearby_races?limit=8&lat=' + lat + '&lng=' + lng)
    }
  }, */
  mounted: function () {
    this.$store.dispatch('getSuggestedRaces')
    /* console.log('cccccccc')
    console.log(this.user)
    console.log('bababab')
    this.$router.go('/registration')
    if (!this.user.address || !this.user.address.line1) {
      console.log(1231231)
      console.log(this.$router)
      this.$router.go('/registration')
    */
    /* if (!response.paymentSkipped && !response.passType) {
      // $location.path('/payment')
    } */
  },
  data () {
    return {
      test: function () {
        alert(123)
      },
      upcoming_races: []
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
</style>
