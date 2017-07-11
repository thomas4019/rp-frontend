<template>
  <div id="home">
    <div id="promo" class="shadowed"><a id="freeTrial" @click="buy('freeTrial')">Try Racepass free</a></div>
    <div id="banner1">
      <video class="hide-on-mobile" poster="/static/videos/promo4.jpg" id="bgvid" playsinline autoplay muted loop>
        <source src="/static/videos/promo4.mp4" type="video/mp4">
        <source src="/static/videos/promo4.webm" type="video/webm">
      </video>
      <div id="find-races-panel">
        <div class="subtitle">Racepass is the first subscription to distance races. Get access to 5000+ races with one simple pass.</div>
        <div class="button-row hide-on-desktop">
          <div id="findbyme" class="button-continue shadowed" v-scroll-to="'#choose-pass, 0px'">Find races near me</div>
          <div class="button-continue-icon">⌵</div>
        </div>
        <button class="shadowed hide-on-mobile" v-scroll-to="'#choose-from, 0px'">Find Races</button>
      </div>
    </div>
    <modal classes="rp-modal" :adaptive="true" :height="450" :width="750" name="login">
      <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('login')"><span aria-hidden="true">&times;</span></button>
      <login :isCreation="isCreation" />
    </modal>
    <div class="text-features"style="">
      No race lotteries
      <span class="bullet"></span>
      No commitments
      <span class="bullet"></span>
      Cancel anytime
    </div>
    <section id="selling-points-wrapper">
      <div class="container" id="selling-points">
        <div class="row">
          <h2 class="centered bottom-margin">Racing made simple</h2>
        </div>
        <div class="row justify-content-center">
          <div class="col-sm-4 selling-point">
            <div class="selling-icon"><img src="/static/imgs/discover.png" /></div>
            <h3>Discover</h3>
            <p>Find more than 5,000 races anywhere in the world. Try local &amp; recommended races and invite friends to race.</p>
          </div>
          <div class="col-sm-3 selling-point">
            <div class="selling-icon"><img src="/static/imgs/register.png" /></div>
            <h3>Register</h3>
            <p style="margin:initial">Register for any race with a single click. Manage your entire race calendar from one simple account.</p>
          </div>
          <div class="col-sm-4 selling-point">
            <div class="selling-icon"><img src="/static/imgs/race.png" /></div>
            <h3>Race</h3>
            <p>Get your bib, show up at the starting line &amp; finish. Track all your results and photos from one dash.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="featured-in-wrapper" class="hide-on-mobile">
      <div id="featured-in">
        <h4>As featured in</h4>
        <div class="sources">
          <div class="source-logo"><img src="/static/imgs/boston_magazine.png" /></div>
          <div class="source-logo"><img src="/static/imgs/competitor.png" /></div>
          <div class="source-logo"><img src="/static/imgs/runner.png" /></div>
          <div class="source-logo"><img src="/static/imgs/shape.png" /></div>
          <div class="source-logo"><img src="/static/imgs/philadelphia.png" /></div>
        </div>
      </div>
    </section>
    <section>
      <div id="choose-from" class="container">
        <div class="row">
          <h2 class="centered bottom-margin">Choose from more than 5,000 races</h2>
        </div>
        <HomeSearch />
        <div class="button-row">
          <div class="button-continue shadowed" v-scroll-to="'#choose-pass, 0px'">Choose your pass</div>
          <div class="button-continue-icon">⌵</div>
        </div>
      </div>
    </section>
    <section id="choose-pass">
      <div class="container" style="max-width: 1000px !important;">
        <div class="row">
          <h2 class="centered">Let's get you up and running</h2>
        </div>
        <div class="info">Each pass buys you a pre-set number of races for the year. No matter which types of race you pick, if it's a 5k or a Marathon, Racepass covers the full registration cost of your races.</div>
        <slick  ref="slick" :options="slickOptions" id="pass-wrapper" class="container row">
          <div class="pass-container">
            <div class="pass pass-side">
              <div class="pass-title">Contender</div>
              <div class="pass-body">
                <div class="pass-count">Covers registration for <em>three</em> races</div>
                <div class="distances">Marathon • Half Marathon<br />
                    20K • 15K • 12k • 10k<br />
                    5K • Fun Run
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
                <div class="pass-count">Covers registration for <em>six</em> races</div>
                <div class="distances">Marathon • Half Marathon<br />
                    20K • 15K • 12k • 10k<br />
                    5K • Fun Run
                </div>
                <div class="pass-price-row"><span class="pass-price">${{passPrices['5races']}}</span>/yr</div>
              </div>
              <a id="buy2" @click="buy('5races')" class="pass-buy"><button>Buy Athlete</button></a>
            </div>
          </div>
          <div class="pass-container">
            <div class="pass">
              <div class="pass-title">Pro</div>
              <div class="pass-body">
                <div class="pass-count">Covers registration for <em>twelve</em> races</div>
                <div class="distances">Marathon • Half Marathon<br />
                  20K • 15K • 12k • 10k<br />
                  5K • Fun Run
                </div>
                <div class="pass-price-row"><span class="pass-price">${{passPrices['unlimited']}}</span>/yr</div>
              </div>
              <a id="buy3" @click="buy('12races')" class="pass-buy"><button>Buy Pro</button></a>
            </div>
          </div>
        </slick>
        <div class="info wide">
          <p>If you can't make your race, don't sweat it. We've got you covered. We are the only company in our industry to offer free race cancellation. </p>
          <p><router-link to="/faq#refund"><em>Learn more</em></router-link></p>
        </div>
      </div>
    </section>
    <section>
      <div id="faq" class="container">
        <div class="row">
          <h2 class="centered">Any questions running through your mind?</h2>
        </div>
        <rp-question id="q1">
          <span slot="question">Can I see a list of races available?</span>
          <span slot="answer">You can find all the races in our network in the map on the homepage or in your account. If you want to browse a list of races, select the list icon to the right of the search bar and filters. </span>
        </rp-question>
        <rp-question id="q2">
          <span slot="question">How many races can I run?</span>
          <span slot="answer">Each Racepass plan has its own limitations. Please see our pricing page for complete plan details.</span>
        </rp-question>
        <rp-question id="q3">
          <span slot="question">Are there blackout dates or races you don’t cover?</span>
          <span slot="answer">There are no blackout dates for the races listed in our network. If it's listed, you can run it. If you're looking for a race and we don't have it in our map or list results, then it's not in our network just yet. If you want us to include it, let us know by emailing support@racepass.com and we'll try to work our magic.</span>
        </rp-question>
        <rp-question id="q6">
          <span slot="question">What if I sign up for a race but have to cancel?</span>
          <span slot="answer">One of the many benefits of Racepass is the flexibility it offers. As long as it’s more than 14 calendar days from race day, you can cancel any race at any time. If it is closer than 14 days then the race credit will be used.</span>
        </rp-question>
        <rp-question id="q4">
          <span slot="question">Do you have a refund policy?</span>
          <span slot="answer">Upon cancellation, all subsequent race registrations will be cancelled and the full registration amount of any race within 14 calendar days will be deducted from the refund as well. The remaining amount will be returned to you via your method of payment within 3-5 business days.</span>
        </rp-question>
      </div>
      <div id="faq-full" class="button-row">
        <router-link to="/faq"><div class="button-continue shadowed">See full list of FAQs</div></router-link>
      </div>
    </section>
  </div>
</template>

<script>
import rp from '../rp'
import Login from '@/components/Login'
import Slick from 'vue-slick'
import Question from '@/components/Question'
import RpMap from '@/components/Map'
import HomeSearch from '@/components/HomeSearch'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default {
  name: 'home',
  components: {
    'login': Login,
    'rp-question': Question,
    'rp-map': RpMap,
    HomeSearch,
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
            variableWidth: false,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: false
          },
        }
        ],
      },
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 800px) {
  .hide-on-desktop {
    display: none !important;
  }
}
@media screen and (max-width: 799px) {
  #home #banner1 {
    height: initial;
  }
  #home #banner1 #find-races-panel {
    margin-top: 33px;
  }
  #home #find-races-panel .subtitle {
    font-size: 20px;
    line-height: 27px;
    margin: 0px 35px;
  }
  #findbyme {
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.3);
  }
  #home .text-features {
    background-color: #323237;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
    text-align: center;
    border: none;
    font-weight: 300;
    padding: 16px 10px;
  }
  #home span.bullet {
    margin: 0 8px;
  }
  #home .selling-point {
    padding: 10px 20px;
  }
  #home #selling-points h2,
  #home #choose-from {
    font-size: 18px;
    font-weight: 900;
    line-height: 25px;
  }
  #home #selling-points h3 {
    font-size: 16px;
    font-weight: 900;
    line-height: 22px;
  }
  #home #selling-points p {
    font-weight: 300;
    margin: 0px 35px;
  }
  #selling-points .selling-icon img {
    height: 62px;
  }
  #selling-points .selling-icon {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.3);
  }
  #home #choose-from {
    margin: 0px 35px;
  }
  #choose-pass #pass-wrapper .pass {
    width: 200px;
  }
  #pass-wrapper .pass-title {
    font-size: 18px;
    line-height: 25px;
    margin: 15px auto 0px auto;
  }
  #pass-wrapper .pass-price-row {
    font-size: 18px;
    line-height: 25px;
  }
  #pass-wrapper .pass-count {
    font-size: 14px;
    line-height: 19px;
  }
  #pass-wrapper .pass-buy {
    margin: 10px 23px 25px 23px;
  }
  #pass-wrapper .pass-buy button {
    font-size: 14px;
    line-height: 19px;
    padding: 12px 0px;
  }
}
</style>

<style>
.slick-dots button:before {
  color: #f7f7f7 !important;
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
  font-size: 14px;
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
  font-weight: 900;
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
  color: #ffffff;
  text-shadow: 0 0 6px rgba(0,0,0,0.5);
  margin-bottom: 12px;
}
#find-races-panel .subtitle {
  font-size: 24px;
  line-height: 33px;
  color: #D8D8D8;
  text-shadow: 0 0 6px rgba(0,0,0,0.5);
  margin: 0 auto 30px auto;
  max-width: 400px;
  padding: 0px 10px;
  font-weight: 900;
}
#find-races-panel button {
  font-weight: 900;
  padding: 10px 20px;
}
@media screen and (max-width: 600px) {
    #banner1 .text {
        width: 290px;
    }
}

#selling-points {
  color: #f7f7f7;
  text-align: center;
}

#selling-points h3 {
  font-size: 18px;
  margin: 10px 0px;
  color: #D8D8D8;
  font-weight: 900;
}
.selling-point {
  padding: 0px 20px;
}
#selling-points p {
  line-height: 16px;
  font-size: 12px;
  margin: 0px 15%;
  color: #9B9B9B;
}
.selling-icon {
  margin: 21px auto;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-align: center;
  background-color: #323237;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3);
}
.selling-icon img {
  height: 60px;
}
.button-row {
  width: 100%;
  text-align: center;
  margin: 40px 0px 40px 0px;
}
.button-continue {
  border-radius: 100px;
  font-weight: 300;
  font-size: 15px;
  padding: 15px 25px;
  display: inline-block;
  background-color: #323237;
  color: #0DFFAE;
  cursor: pointer;
}
.button-continue-icon {
  font-size: 36px;
  color: #0DFFAE;
  line-height: .6;
  font-weight: lighter;
}
.text-features {
  text-align: center;
  padding: 8px 15px;
  border: 0.5px solid #4A4A4A;
  color: #9b9b9b;
  font-size: 12px;
}
.text-features .bullet {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #4A4A4A;
  display: inline-block;
  margin: 0px 15px;
}

#featured-in-wrapper h4 {
	color: #D8D8D8;
	font-size: 18px;
  font-weight: 300;
	line-height: 25px;
	text-align: center;
  margin: 0px 0px 25px 0px;
}
#featured-in-wrapper .sources {
  background-color: #323237;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
  text-align: center;
}
#featured-in-wrapper .source-logo {
  display: inline-block;
  margin: 28px 31px;
}
#featured-in-wrapper .source-logo img {
  display: inline-block;
  max-height: 34px;
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


#choose-pass .info {
  color: #D8D8D8;
  font-size: 14px;
  margin: 0 auto 30px auto;
  text-align: center;
  width: 50%;
  max-width: 410px;
}
.info p {
  margin-bottom: 0px;
}
#choose-pass .info.wide {
  max-width: initial;
  width: 100%;
}
#pass-wrapper {
  flex-direction: row;
  text-align: center;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  padding: 0px;
}
.pass-container {
  padding: 10px;
  margin-top: 5px;
}
.pass {
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
.distances {
  font-weight: 300;
  color: #FFFFFF;
  font-size: 14px;
  line-height: 19px;
  margin: 40px 0px 15px 0px;
}
.pass p {
  margin: 0px 0px 15px 0px;
}
.pass-body {
  height: 250px;
  background-color: #6A6A6A;
  font-weight: 900;
  font-size: 16px;
  border-radius: 2px;
  padding: 20px 5px 20px 5px;
  margin: 0px 23px;
  box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.5);
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
  margin: 30px 55px 28px 55px;
  padding: 6px;
  font-size: 18px;
  height: 42px;
  font-weight: 900;
}
.pass-buy button {
  width: 100%;
  border-radius: 4px;
  color: #4A4A4A;
}

#faq {
  max-width: 920px !important;
}


</style>
