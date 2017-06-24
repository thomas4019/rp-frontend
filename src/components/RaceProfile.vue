<template>
<div class="race-profile">
    <section id="race-title" class="container">
        <h1 class="race-profile-title">{ {race.name}} <span class="race-profile-check">Premier Partner</span></h1>
        <h2 class="race-profile-dropdown">Marathon <span>V</span></h2>
    </section>
    <section id="race-picture" class="container">
        <img class="race-profile-picture" src="">
    </section>
    <section id="race-info" class="container line-below">
        <div class="row">
            <div class="col-sm-6">
                <h2>Event Details</h2>
                <dl>
                    <dt>Distance</dt>
                    <dd>{ {course.distance}}</dd>
                </dl>
                <dl>
                    <dt>Date</dt>
                    <dd>{ {race.datetime}}</dd>
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
        </div>
    </section>
    <section id="race-details" class="container line-below">
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
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
h1 {
	color: #D6D6D6;
	font-size: 16px;
	font-weight: 900;
	line-height: 22px;
}
h2 {
	color: #D8D8D8;
	font-size: 12px;
	font-weight: 900;
	line-height: 16px;
}
dl {
    margin: 3px;
}
dt {
	color: #9B9B9B;
	font-size: 11px;
	font-weight: 300;
	line-height: 15px;
    display: inline-block;
    width: 50%;
}
dd {
	color: #D8D8D8;
	font-size: 11px;
	font-weight: 900;
	line-height: 15px;
    display: inline-block;
}
button {
	color: #22262B;
	font-size: 14px;
	font-weight: 900;
	line-height: 19px;
	text-align: center;
    width: 100%;
    padding: 5px 0px 5px 0px;
}
section {
    padding-bottom: 20px;
    margin-top: 10px;
}
section.line-below {
    border-bottom: 0.5px solid #979797; 
}
span.race-profile-check {
    color: #9B9B9B;
    font-size: 10px;
    font-weight: 900;
    line-height: 14px;
}

.race-profile-dropdown {
	color: #0DFFAE;
	font-size: 11px;
	font-weight: 300;
	line-height: 15px;
}
#race-picture {
    width:100%;
    padding: 5px 0px 5px 0px;
}
img.race-profile-picture {

}

</style>
