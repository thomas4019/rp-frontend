<template>
<div class="race-profile">
    <section id="race-title" class="container">
        <h1>{{race.name}} <span id="race-profile-check">Premier Partner</span></h1>
        <h2>Marathon <span id="race-profile-dropdown">V</span></h2>
    </section>
    <section id="race-picture" class="container">
        <img src="">
    </section>
    <section id="race-info" class="container">
        <div class="col-sm-6">
            <h2>Event Details</h2>
            <dl>
                <dt>Distance</dt>
                <dd>{{course.distance}}</dd>
            </dl>
            <dl>
                <dt>Date</dt>
                <dd>{{race.datetime}}</dd>
            </dl>
            <dl>
                <dt>Start times(s)</dt>
                <dd>9:00am drop down</dd>
            </dl>
            <dl>
                <dt>Participants</dt>
                <dd>4,500</dd>
            </dl>
            <dl>
                <dt>Avg. finisher time</dt>
                <dd>3:34:12</dd>
            </dl>
            <dl>
                <dt>Course time limit</dt>
                <dd>6 hrs</dd>
            </dl>
            <dl>
                <dt>Race start elevation</dt>
                <dd>356’</dd>
            </dl>
            <dl>
                <dt>Race finish altitude</dt>
                <dd>10’</dd>
            </dl>
            <dl>
                <dt>Elevation Gain</dt>
                <dd>+2,182’</dd>
            </dl>
            <dl>
                <dt>Elevation Drop</dt>
                <dd>-2,528’</dd>
            </dl>
            <a>Elevation map</a>
        </div>
        <div class="col-sm-6">
            <div class="col-sm-12">
                <button>Register</button>
            </div>
            <div class="col-sm-12">
                --- Map ---
            </div>
            <div class="col-sm-12">
                <a>Directions</a>
                <a>Course Map</a>
                <a>Aid Stations</a>
            </div>
        </div>
    </section>
    <section id="race-details" class="container">
        <h2>Raceday Details</h2>
        <dl>
            <dt>Amenities</dt>
            <dd>Shirt, finisher medal, food & drink</dd>
        </dl>
        <dl>
            <dt>Packet / Race bib pick up</dt>
            <dd>In-person at Race Expo</dd>
        </dl>
        <dl>
            <dt>Parking / transit</dt>
            <dd>Free bus transit for participants</dd>
        </dl>
        <dl>
            <dt>Gear check</dt>
            <dd>Free for participants at race start</dd>
        </dl>
        <dl>
            <dt>Race rules</dt>
            <dd>No pacers, infants, bib switching </dd>
        </dl>
        <dl>
            <dt>Awards</dt>
            <dd>Top three finishers</dd>
        </dl>
        <dl>
            <dt>Divisions</dt>
            <dd>Male, female age brackets</dd>
        </dl>

        <h2>Records</h2>
        <dl>
            <dt>Male</dt>
            <dd>Brad Hawthorne, 1987, 2:16:39</dd>
        </dl>
        <dl>
            <dt>Female</dt>
            <dd>Svetlana Vasilyeva, 1996, 2:41:34</dd>
        </dl>
        <a>View full records</a>
    </section>

    <section id="race-partners" class="container">
        <h2>Event partners</h2>
        <img src="">
    </section>
</div>
</template>


<script>
import rp from '../rp'
export default {
  name: 'race-profile',
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
