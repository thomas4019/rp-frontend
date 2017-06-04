<template>
  <div id="home">
    <div id="promo"><a id="freeTrial" @click="buy('freeTrial')">Try Racepass free</a></div>
    <div id="banner1">
      <video poster="/static/videos/promo4.jpg" id="bgvid" playsinline autoplay muted loop>
        <source src="/static/videos/promo4.mp4" type="video/mp4">
        <source src="/static/videos/promo4.webm" type="video/webm">
      </video>
      <div id="find-races-panel">
        <div class="title">One&nbsp;pass. 5,000+&nbsp;races.</div>
        <div class="subtitle">Racepass is the first subscription for distance races. Starting at $195, our entry level pass covers the full registration costs for any 3 races.</div>
        <button ng-click="landing.findRaces()">Find my next race</button>
      </div>
    </div>
    <modal classes="rp-modal" :adaptive="true" :height="450" :width="750" name="login">
      <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('login')"><span aria-hidden="true">&times;</span></button>
      <login :isCreation="isCreation" />
    </modal>
    <div style="text-align: center; padding: 22px 10px; border-bottom: 1px solid #979797; color: #9b9b9b;">
      No race lotteries
      <span style="color: #4a4a4a; padding: 0px 5px;">•</span>
      No commitments
      <span style="color: #4a4a4a; padding: 0px 5px;">•</span>
      Cancel anytime
    </div>
    <div id="selling-points-wrapper">
      <div class="container" id="selling-points">
        <div class="row">
          <h2>Racing made simple</h2>
        </div>
        <div class="row">
          <div class="col-sm-4 selling-point">
            <div class="selling-icon"><img src="static/imgs/discover.png" /></div>
            <h3>Discover</h3>
            <p>Search more than 5,000 races anywhere in the world. Try local &amp; recommended races and invite friends to race.</p>
          </div>
          <div class="col-sm-4 selling-point">
            <div class="selling-icon"><img src="static/imgs/register.png" /></div>
            <h3>Register</h3>
            <p>Register for any race with a single click. Manage your entire race calendar from one simple account.</p>
          </div>
          <div class="col-sm-4 selling-point">
            <div class="selling-icon"><img src="static/imgs/race.png" /></div>
            <h3>Race</h3>
            <p>Get your racing bib, show up at the starting line &amp; finish. Track all your race results and photos from one dash.</p>
          </div>
        </div>
      </div>
    </div>
    <div id="races-near-me" style="margin-bottom: 0px;" class="button-row">
      <div class="button-continue">Find races near me</div>
      <div class="button-continue-icon">⌵</div>
    </div>
    <div id="race-logos-wrapper">
      <div id="race-logos"></div>
    </div>
    <div id="choose-from" class="callout" style="margin: 16px 0 41px 0; padding-top:40px">
      Choose from over 5,000+ races anywhere in the world
    </div>

    <!-- TODO INSERT SEARCH HERE !-->
    <rp-map />

    <div class="button-row">
      <div id="choose-pass-button" class="button-continue">Choose your pass</div>
      <div class="button-continue-icon">⌵</div>
    </div>
    <section id="choose-pass">
      <div id="pass-header" class="callout">Let's get you up and running</div>
      <div class="info">Each pass buys you a pre-set number of races for the year. No matter which types of race you pick, if it's a 5k or a Marathon, Racepass covers the full registration cost of your races.</div>
      <slick ref="slick" :options="slickOptions" id="pass-wrapper" class="container row">
        <div class="pass-container">
          <div class="pass pass-side">
            <div class="pass-title">Contender</div>
            <div class="pass-body">
              <div class="pass-top">
                <div class="pass-count">Covers registration for <em>three</em> Races</div>
                <br />
                <div class="distances">26.2 • 13.1<br />
                  10k • 5k • Fun Runs
                </div>
              </div>
              <div class="pass-price-row"><span class="pass-price">${{passPrices['3races']}}</span>/yr</div>
            </div>
             <a id="buy1" @click="buy('3races')" class="pass-buy"><button>Buy Contender</button></a>
          </div>
        </div>
        <div class="pass-container">
          <div class="pass">
            <div class="pass-title">Athlete</div>
            <div class="pass-body">
              <div class="pass-top">
                <div class="pass-count">Covers registration for <em>five</em> Races</div>
                <br />
                <div class="distances">26.2 • 13.1<br />
                  10k • 5k • Fun Runs
                </div>
              </div>
              <div class="pass-price-row"><span class="pass-price">${{passPrices['5races']}}</span>/yr</div>
            </div>
            <a id="buy2" @click="buy('5races')" class="pass-buy"><button>Buy Athlete</button></a>
          </div>
        </div>
        <div class="pass-bordered">
          <em style="font-size: 18px;">SOLD OUT</em>
          <div class="pass-container">
            <div class="pass pass-side">
              <div class="pass-title">Pro</div>
              <div class="pass-body">
                <div class="pass-top">
                  <div class="pass-count">Covers registration for <em>unlimited</em> Races</div>
                  <br />
                  <div class="distances">26.2 • 13.1<br />
                    10k • 5k • Fun Runs
                  </div>
                </div>
                <div class="pass-price-row"><span class="pass-price">${{passPrices['unlimited']}}</span>/yr</div>
              </div>
              <a id="buy3" class="pass-buy"><button>Sold out</button></a>
            </div>
          </div>
        </div>
      </slick>
      <div class="info">
        <p>If you decide you don't want to use all your races, don't sweat it, we've got you covered.</p>
        <p><router-link to="/faq"><em>Learn more.</em></router-link></p>
      </div>
    </section>
    <div id="faq" class="container">
      <div class="callout">
        Any questions running through your mind?
      </div>
      <rp-question id="q1">
        <span slot="question">What is Racepass?</span>
        <span slot="answer">Racepass is a subscription-based annual pass that helps runners run as many races as they can muster.</span>
      </rp-question>
      <rp-question id="q2">
        <span slot="question">Where can I use Racepass?</span>
        <span slot="answer">Racepass can be used at over 5,000 race events across the nation and more are being added everyday. For complete race listings please see racepass.com/map.</span>
      </rp-question>
      <rp-question id="q3">
        <span slot="question">How many races can I run?</span>
        <span slot="answer">Each Racepass plan has its own limitations. Please see our pricing page for complete plan details.</span>
      </rp-question>
      <rp-question id="q6">
        <span slot="question">What are the benefits of Racepass?</span>
        <span slot="answer">Racepass eliminates the administrative headache of finding, registering and recruiting friends for races. It also allows you to run as many races as you can, tracking your times to help you train and run faster. It also provides you the flexibility to change or cancel races and not have to lose your money. See our cancelation policy below for more details.</span>
      </rp-question>
      <rp-question id="q4">
        <span slot="question">When does Racepass membership begin?</span>
        <span slot="answer">You can begin signing up for races immediately after completing your purchase.</span>
      </rp-question>
      <div v-show="!isFaqExpanded" @click="isFaqExpanded = true;" id="faq-more-button" style="margin-bottom:75px;" class="button-row">
        <div class="button-continue">More FAQs</div>
      </div>
      <div v-show="isFaqExpanded" id="faq-more">
        <rp-question id="q5">
          <span slot="question">Does my Racepass auto-renew?</span>
          <span slot="answer">Racepass will allow you to auto-renew your membership. If you choose to not auto-renew, you can opt out through your subscription settings in your profile.</span>
        </rp-question>
        <rp-question id="q7">
          <span slot="question">Where can I use Racepass?</span>
          <span slot="answer">Racepass can be used at over 5,000 race events across the nation and more are being added everyday.</span>
        </rp-question>
        <rp-question id="q8">
          <span slot="question">How many races can I run?</span>
          <span slot="answer">Each Racepass plan is different. Check out our pricing tiers for complete plan details.</span>
        </rp-question>
        <rp-question id="q9">
          <span slot="question">Is there a cancellation policy?</span>
          <span slot="answer">Flexibility is a good thing. You can cancel your Racepass at anytime! To cancel your Racepass, head to your subscription settings in your profile.</span>
        </rp-question>
      </div>
    </div>
    <div v-show="isFaqExpanded" id="faq-full" style="margin-bottom:75px;" class="button-row">
      <router-link to="/faq"><div class="button-continue">See full list of FAQs</div></router-link>
    </div>
  </div>
</template>

<script>
import rp from '../rp'
import Login from '@/components/Login'
import Slick from 'vue-slick'
import Question from '@/components/Question'
import RpMap from '@/components/Map'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default {
  name: 'home',
  components: {
    'login': Login,
    'rp-question': Question,
    'rp-map': RpMap,
    Slick
  },
  methods: {
    buy (type) {
      localStorage.buyType = type
      this.isCreation = true
      this.$modal.show('login')
    }
  },
  data () {
    return {
      isCreation: false,
      isFaqExpanded: false,
      passPrices: rp.passPrices,
      slickOptions: {
        dots: true,
        centerMode: true,
        initialSlide: 1,
        variableWidth: true,
        infinite: false,
        responsive: [{
          breakpoint: 2500,
          settings: {
            infinite: true,
            slidesToShow: 3,
            variableWidth: false
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 1
          },
        }
        ],
      },
    }
  }
}
</script>

<style>
.slick-dots button:before {
  color: #F7F7F7 !important;
  height: 30px;
  width: 30px;
}
.slick-slide{
  width: 350px;
}
</style>

<style scoped>
#promo {
  background-color: #323237;
  font-size: 18px;
  height: 38px;
  line-height: 38px;
  position: fixed;
  top: 0px;
  text-align: center;
  width: 100%;
  z-index: 1000;
}
#promo a {
  color: #0dffae;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
}

#banner1 {
  height: 500px;
  position: relative;
  overflow: hidden;
}
#banner1 video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  min-width: 850px;
}
#banner1 #find-races-panel {
  z-index: 100;
  position: relative;
  margin-top: 150px;
  text-align: center;
}
#find-races-panel .title {
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  line-height: 49px;
  color: #FFFFFF;
  text-shadow: 0 0 6px rgba(0,0,0,0.5);
  margin-bottom: 12px;
}
#find-races-panel .subtitle {
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  color: #d8d8d8;
  text-shadow: 0 0 6px rgba(0,0,0,0.5);
  margin: 0 auto 30px auto;
  max-width: 400px;
  padding: 0px 10px;
}
#find-races-panel button {
  font-weight: 900;
  padding: 10px 15px;
}
#find-races-panel input {
  color: #0DFFAE;
  border: none;
  border-bottom: 1.5px solid #0DFFAE;
  border-radius: 0px;
  font-weight: 900;
  width: 150px;
  height: 24px;
  margin-left: 10px;
  padding-left: 0px;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: transparent;
}
#find-races-panel input:focus {
   outline: none;
}
#banner1 .container {
  z-index: 100;
  position: relative;
}
#banner1 .text {
  width: 400px;
  margin-top: 25px;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: 500;
  line-height: 49px;
  color: #F7F7F7;
  text-shadow: 0 0 6px rgba(0,0,0,0.5);
}
@media screen and (max-width: 600px) {
    #banner1 .text {
        width: 290px;
    }
}
#banner1 .textbox {
  padding-top: 5%;
  margin-left: 10%;
  font-size: 28px;
  max-width: 303.83px;

}
.input-row {
  display: flex;
  width: 100%;
}
.input-row input {
  width: 0; /* actual width controlled by flex*/
  font-size: 14px;
  height: 40px;
}
#field-email {
  flex: 3;
  margin: 0px 10px 10px 0px;
  background-color: #F7F7F7;
  border-radius: 8px;
}
#field-zip {
  flex: 1;
  margin: 0px 0px 10px 0px;
  background-color: #F7F7F7;
  border-radius: 8px;
}
#find-button {
  font-size: 14px;
  height: 46.24px;
  color: #10383D;
}
#separator-row {
  display: flex;
  text-align: center;
  margin: 8px 3px;
  font-size: 14px;
  font-weight: 900;
  line-height: 19px;
  color: #F7F7F7;
}
.hbar {
  flex: 3;
}
.container {
  max-width: 1000px !important;
}
#find-disclaimer {
  padding: 8px 35px 0px 35px;
  height: 24px;
  font-family: Avenir;
  font-size: 9px;
  font-weight: 500;
  text-align: center;
  line-height: 12px;
  color: #F7F7F7;
}

/* Styles for 3 column main features */
#selling-points-wrapper {
  margin: 0px 25px 0px 25px;
}
#selling-points {
  color: #F7F7F7;
  padding: 20px 0px;
  text-align: center;
}
#selling-points h3 {
  font-size: 22px;
  margin: 10px 0px;
}
.selling-point {
  padding: 20px;
}
#selling-points p {
  line-height: 25px;
  margin: 0px;
  color: #ABAEB7;
}
.selling-icon {
  margin: 21px auto;
  display: block;
  width: 80px;
  height: 80px;
  text-align: center;
}
.selling-icon img {
  height: 80px;
}
.point-ch {
  margin-top: 31px;
}

.button-row {
  width: 100%;
  text-align: center;
  margin: 40px 0px 40px 0px;
}
.button-continue {
  border: 1px solid #979797;
  border-radius: 100px;
  font-weight: 300;
  padding: 15px 15px;
  display: inline-block;
  color: #F7F7F7;
  cursor: pointer;
}
.button-continue-icon {
  font-size: 36px;
  color: #979797;
  line-height: .6;
  font-weight: lighter;
}

/** Race Logos Section */
#race-logos-wrapper {
  width: 100%;
  overflow: hidden;
}
#race-logos {
  background: #F7F7F7;
  width: 10000px;
  margin-left: -50px;
  /*transition: 1.5s linear;*/
}
.race-logo {
  opacity: .75;
  margin: 0px;
  /*filter: grayscale(100%);*/
  padding: 15px 25px;
}


#m-search-wrapper {
  padding: 14px 18px 10px 17px;
  width: 100%;
  position: relative;
  pointer-events: auto;
}
#pac-input {
  font-size: 16px;
  width: 100%;
  z-index: 11;
  padding-right: 80px;
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
  color: #D6D6D6;
}
.filter .value {
  font-weight: 900;
  line-height: 19px;
  color: #D8D8D8;
}
.value.selected {
  color: #0DFFAE;
}

.filter-options {
  height: 52px;
  border-top: 0.5px solid #979797;
  border-bottom: 0.5px solid #979797;
}
.values {
  list-style-type: none;
  display: flex;
  padding: 0px;
}
.values li {
  margin-left: 7px;
  width: 30px;
  height: 12px;
  font-family: Avenir;
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  color: #0DFFAE;
}


/* Choose your pass page */
#choose-pass {
  font-size: 36px;
  margin: 0px 25px 0px 25px;
}

#choose-pass .info {
  color: #D8D8D8;
  font-size: 14px;
  margin: 0 auto 30px auto;
  text-align: center;
  width: 50%;
}

#pass-header {
}

#pass-wrapper {
  flex-direction: row;
  text-align: center;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  padding: 0px;
}
.pass-container {
  padding: 10px;
  margin-top: 5px;
}
.pass {
  /*margin: 30px 10px 0px 10px;*/
  height: 425px;
  background-color: #323237;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.5);
  border-radius: 4px;
  display: inline-block;
  width: 100%;
}
:not(.pass-bordered) > .pass-container {
  margin-top: 40px;
}
.pass-bordered {
  border: 2px solid #0DFFAE;
  border-radius: 14px;
  padding: 5px;
}
.pass-title {
  height: 36px;
  font-family: Avenir;
  font-size: 26px;
  font-weight: 900;
  text-align: center;
  line-height: 36px;
  color: #0DFFAE;
  margin: 47px auto 29px auto;
}
.pass-count {
  font-size: 18px;
  padding: 0px 15px;
}
.pass p {
  margin: 0px 0px 15px 0px;
}
.pass-body {
  height: 225px;
  background-color: #6A6A6A;
  font-weight: 900;
  font-size: 16px;
  border-radius: 2px;
  padding: 20px 5px 20px 5px;
  margin: 0px 23px;
}
.pass-top {
  height: 120px;
}
.pass-price-row {
  margin-top: 27px;
}
.pass-price {
  font-size: 24px;
  font-weight: bold;
}
.pass-buy {
  display: block;
  margin: 10px 55px 5px 55px;
  padding: 6px;
  font-size: 16px;
  height: 40px;
}
.pass-buy button {
  width: 100%;
}

#faq {
  max-width: 920px !important;
}
#faq-full .button-continue {
  height: 43px;
  border: 1px solid #F7F7F7;
  border-radius: 100px;
  font-family: Avenir;
  padding: 11px;
}

</style>
