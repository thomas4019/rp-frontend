<template>
  <div id="home">
    <div class="row justify-content-center no-gutters">
      <div class="col-12">
        <section id="banner1" class="no-margin">
          <div class="row justify-content-center">
            <div class="col-6">
                <div id="find-races-panel">
                  <div class="subtitle"><h1>Find the best endurance races</h1></div>
                  <div class="button-row hide-on-desktop">
                    <div id="findbyme" class="button-continue shadowed" v-scroll-to="'#choose-pass, 0px'">Find races near me</div>
                    <div class="button-continue-icon">⌵</div>
                  </div>
                  <div class="container">
                    <div class="row">
                      <div class="col-12">
                        <HomeFilterRow />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>
        <modal classes="rp-modal" :adaptive="true" :height="450" :width="750" name="login">
          <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('login')"><span aria-hidden="true">&times;</span></button>
          <login :isCreation="true" />
        </modal>
      </div>
    </div>
    <div class="row justify-content-center no-gutters">
      <div class="col-12 col-sm-8 col-md-8 col-lg-6">
        <section>
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2>Help the running community</h2>
              </div>
              <div class="col-12 col-md-6">
                <p>With more than 20,000 races, we’ve built the largest search engine for race events. Help the running community find the best races by sharing your experiences and keeping event details accurate & up to date. </p>
                <button class="hollow">Write a review</button>
              </div>
              <div class="col-12 col-md-6">
                <img src="/static/imgs/map.png" style="width: 100%">
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container">
            <div class="row location-icons">
              <div class="col-12">
              <h2>Destination races</h2>
              </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Jungfrau.png"> <span>Jungfrau, Switzerland</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Toyko.png"> <span>Tokyo, Japan</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Patagonia.png"> <span>Patagonia, Chile</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Great_Wall_of_China.png"> <span>Great Wall of China</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Havana.png"> <span>Havana, Cuba</span> </div>
            </div>
          </div>
        </section>
        

        <section>
          <div class="container">
            <div class="row location-icons">
              <div class="col-12">
              <h2>The Big 5</h2>
              </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Boston.png"> <span>Boston</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Brooklyn_Bridge.png"><span>New York</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Chicago.png"> <span>Chicago</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/London.png"> <span>London</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Berlin.png"> <span>Berlin</span> </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h3 class="local-race-title">Local race events near San Francisco</h3>
              </div>
            </div>
          </div>
        </section>

        <section style="margin-top: 20px;">
          <div class="container">
            <div class="row location-icons">
              <div class="col-12">
              <h2>Regional Half & Full Marathons</h2>
              </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Marin_Headlands.png"> <span>Marin</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Golden_Gate.png"> <span>San Francisco</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/San_Jose.png"> <span>San Jose</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Big_Sur.png"> <span>Big Sur</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Napa_Valley.png"> <span>Napa</span> </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container">
            <div class="row location-icons">
              <div class="col-12">
              <h2>Local 5Ks & 10Ks</h2>
              </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Mission_SF.png"> <span>Mission</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Presidio.png"> <span>Presidio</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Marina.png"> <span>Marina</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Embarcadero.png"> <span>Embarcadero</span> </div>
              <div class="col-sm-4 col-md"> <img src="/static/imgs/locations/Twin_Peaks.png"> <span>Twin Peaks</span> </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login'
import HomeFilterRow from '@/components/HomeFilterRow'

export default {
  name: 'home',
  components: {
    'login': Login,
    HomeFilterRow,
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
h3.local-race-title {
  font-size: 20px;
  line-height: 27px;
  font-weight: 900;
  color: #4A4A4A;
  padding-bottom: 20px;
  border-bottom: 1px solid #D8D8D8;
}
h1 {
  font-size: 44px;
  line-height: 60px;
  color: #FFFFFF;
}
#banner1 {
  height: 500px;
  position: relative;
  /* overflow: hidden; */
  background-image: url('/static/imgs/races/B9826.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
#banner1 #find-races-panel {
  z-index: 100;
  position: relative;
  margin-top: 150px;
  text-align: center;
}
.row.location-icons img {
  width: 100%;
}
@media screen and (max-width: 600px) {
    #banner1 .text {
        width: 290px;
    }
}
#m-search-wrapper {
  padding: 14px 18px 10px 17px;
  width: 100%;
  position: relative;
  pointer-events: auto;
}
#search-icon {
  position: absolute;
  top: 6px;
  right: 45px;
  padding: 15px;
  z-index: 20;
  font-size: 18px;
  color: rgba(103,103,103,0.84);
}
#search-close {
  position: absolute;
  top: 12px;
  right: 30px;
  padding: 10px;
  z-index: 20;
  font-family: Arial;
  font-size: 18px;
  font-weight: 100;
  line-height: 25px;
  color: rgba(103,103,103,0.84);
  cursor: pointer;
}

#m-filter-wrapper {
  display: flex;
  font-size: 14px;
  padding: 3px 8px 11px 8px;
}

#m-filter-wrapper .filter {
  padding-left: 13px;
  padding-right: 13px;
}
.filter .header {
  font-weight: 300;
  line-height: 19px;
  color: #d6d6d6;
}
.filter .value {
  font-weight: 900;
  line-height: 19px;
  color: #d8d8d8;
}
.value.selected {
  color: #0dffae;
}

.filter-options {
  height: 52px;
  border-top: 0.5px solid #979797;
  border-bottom: 0.5px solid #979797;
}
</style>

<style scoped>
@media screen and (max-width: 799px) {
  #home #banner1 {
    height: initial;
  }
}
</style>
