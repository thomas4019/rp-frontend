<template>
  <footer>
    <div class="row justify-content-center">
      <div class="col-6">
        <div id="footer-top" class="container">
          <div class="row justify-content-between">
            <div class="col-12 col-lg-6">
              <div class="links">
                <ul class="bottom-menu" style="padding-right: 20px;">
                  <li class="header"><h3>Runners</h3></li>
                  <li><router-link to="/about">How it works</router-link></li>
                  <li><router-link to="/runners-faq">FAQ</router-link></li>
                  <li><router-link to="/contact">Support</router-link></li>
                </ul>
                <ul class="bottom-menu" style="padding-left: 10px;">
                  <li class="header"><h3>Race Directors</h3></li>
                  <li><router-link to="/race-directors">How it works</router-link></li>
                  <li><router-link to="/race-directors-faq">FAQ</router-link></li>
                  <li><router-link to="/contact">Support</router-link></li>
                </ul>
              </div>
            </div>
            <div class="col-12 col-lg-6 align-self-end right hide-on-mobile">
              <div class="social">
                <!-- <a class="heap" href="https://heapanalytics.com/?utm_source=badge" rel="nofollow"><img style="width:70px" src="//heapanalytics.com/img/badge.png" alt="Heap | Mobile and Web Analytics" /></a> -->
                <a href="https://www.facebook.com/RacepassUSA/"><img style="width:35px" src="/static/imgs/icons/social/fb_icon.png"  /></a>
                <a href="https://twitter.com/racepassusa?lang=en"><img style="width:35px" src="/static/imgs/icons/social/twitter_icon.png"  /></a>
              </div>
            </div>
          </div>
          
          
        </div>
        <div id="footer-bottom" class="container">
          <div class="row justify-content-between">
            <div class="col">
              <div class="copyright">2017 Racepass Inc. 450 Franklin Street, Mountain View, CA 94041</div>
            </div>
            <div class="col col-md-4 right terms-section hide-on-mobile">
              <router-link to="/terms" style="padding-right:15px">Terms of Use</router-link>
              <router-link to="/privacy">Privacy Policy</router-link>
            </div>
          </div>
          <p class="container disclaimer hide-on-mobile">All names, logos, and brands of third parties (e.g., race organizers) listed on our site are trademarks of their respective owners. Racepass and its products and services are not endorsed by, sponsored by, or affiliated with these third parties.  Our use of these names, logos, and brands is for identification purposes only, and does not imply any such endorsement, sponsorship, or affiliation.</p>
          <p v-if="$route.path=='/'" class="container disclaimer hide-on-mobile">
            <a href="https://creativecommons.org/licenses/by/3.0/legalcode" target="_blank">CC BY</a> footage from
            <a href="https://www.youtube.com/watch?v=B3ne77AoLog" target="_blank">BGM 2016 - Drone Teaser</a>,
            <a href="https://www.youtube.com/watch?v=thXGgK_APFU" target="_blank">United NYC Half 2016</a>,
            <a href="https://www.youtube.com/watch?v=PVBGw1mlCxM" target="_blank">Marine Corps Half Marathon 2015</a>,
            <a href="https://www.youtube.com/watch?v=z2Zw0ajsEoM" target="_blank">Ramstein Half Marathon</a>,
            <a href="https://www.youtube.com/watch?v=7WkpyuaH3JE" target="_blank">#IComrades New Balance South Africa Comrades Marathon 2015</a>.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'rp-footer',
}
</script>

<style scoped>
footer {
  padding-top: 40px;
  padding-bottom: 5px;
}
footer .disclaimer {
	margin-top: 33px;
	font-size: 12px;
  color: #9B9B9B;
  font-weight: 300;
}
#footer-top {
  padding-bottom: 25px;
	border-bottom: 0.5px solid #FFFFFF;
}
.right {
  text-align: right;
}
.bottom-menu {
  display: inline-block;
	font-size: 12px;
	padding: 0px 10px 0px 0px;
}
.social {
  display: inline-block;
}
ul.bottom-menu {
  margin: 0px;
}
.bottom-menu li {
	list-style-type: none;
  color: #FFFFFF;
  font-weight: 300;
  line-height: 40px;
}
#footer-bottom {
	text-align: center;
  border-top: 0.5px solid #CECECE;
}
#footer-bottom a {
	font-size: 12px;
}

.social .heap {
  margin-right: 15px;
}

#terms {
  display: inline-block;
  text-align: right;
}
#privacy {
  display: inline-block;
}
.copyright {
	font-weight: lighter;
	margin-top: 8px;
  text-align: left;
  font-size: 12px;
}
#footer-bottom .disclaimer a {
  padding: 0;
  font-size: inherit;
  color: #9B9B9B;
}
#video-attribution {
  display: none;
}
@media screen and (max-width: 799px) {
  #footer-top {
    padding-bottom: 25px;
  }
  .copyright {
    text-align: center;
    margin: 20px 0px;
  }
}
</style>
