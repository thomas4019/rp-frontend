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
  mounted: function () {
    localStorage.lat = localStorage.lat || '43'
    localStorage.lng = localStorage.lng || '-113'
    rp.get('nearby_races?limit=8&lat=' + localStorage.lat + '&lng=' + localStorage.lng)
      .then(function (response) {
        console.log(response)
        this.upcoming_races = response
      }.bind(this))

    rp.get('user/me')
      .then(function (response) {
        console.log(response)
        if (!response.address || !response.address.line1) {
          // $location.path('/registration')
        }
        if (!response.paymentSkipped && !response.passType) {
          // $location.path('/payment')
        }
        this.user = response
        this.passName = rp.passNames[this.user.passType]
        this.age = rp.calculateAge(new Date(this.user.date_of_birth))
        if (this.user.facebook_id) {
          this.photo = 'https://graph.facebook.com/' + this.user.facebook_id +
                        '/picture?type=large&w‌​idth=720&height=720'
        } else {
          this.photo = 'imgs/profiles/default-user-avatar.png'
        }
        this.my_races = response.race_listings
        var now = new Date().toISOString()
        var cutoff = new Date()
        cutoff.setDate(cutoff.getDate() + 1)
        this.cancel_cutoff = cutoff.toISOString()
        this.registered_races = response.race_listings.filter(function (race) {
          return race.datetime > now
        })
        this.completed_races = response.race_listings.filter(function (race) {
          return race.datetime <= now
        })
        if (this.user.passType === 'unlimited') {
          this.racesLeft = 'unlimited'
        } else {
          this.racesLeft = rp.passRaceCount[this.user.passType] - this.my_races.length
        }
        this.my_race_signup_ids = response.race_signup_ids
        if (this.user.address && this.user.address.coordinates) {
          localStorage.lat = this.user.address.coordinates.lat
          localStorage.lng = this.user.address.coordinates.lng
          localStorage.city = this.user.address.city
        }
      }.bind(this), function (err) {
        if (err.status === 404) {
          // user is not found, maybe old or invalid token
          delete localStorage.uid
          delete localStorage.token
          window.location = '/'
        }
      })
  },
  data () {
    return {
      user: {
        address: {
        }
      },
      test: function () {
        alert(123)
      },
      age: '',
      photo: '',
      passName: '',
      cancel_cutoff: '',
      registered_races: '',
      completed_races: '',
      upcoming_races: '',
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
