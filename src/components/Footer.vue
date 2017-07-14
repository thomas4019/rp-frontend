<template>
  <footer>
    <div class="row justify-content-center">
      <div class="col-lg-8 col-10">
        <div id="footer-top" class="container">
          <div class="row justify-content-between">
            <div class="col-12 col-lg-6">
              <div class="links">
                <ul class="bottom-menu" style="padding-right: 20px;">
                  <li class="header">Company</li>
                  <li><router-link to="/about">About</router-link></li>
                  <li><a href="https://angel.co/racepass">Careers</a></li>
                  <li><router-link to="/contact">Contact</router-link></li>
                </ul>
                <ul class="bottom-menu" style="padding-left: 10px;">
                  <li class="header">Support</li>
                  <li><router-link to="/partnerships">Partnership Inquiries</router-link></li>
                  <li><router-link to="/faq">FAQ & Help Center</router-link></li>
                  <li><a href="mailto:info@racepass.com">Talk to Support</a></li>
                </ul>
              </div>
            </div>
            <div class="col-12 col-lg-6 align-self-end right hide-on-mobile">
              <div class="social">
                <a class="heap" href="https://heapanalytics.com/?utm_source=badge" rel="nofollow"><img style="width:70px" src="//heapanalytics.com/img/badge.png" alt="Heap | Mobile and Web Analytics" /></a>
                <a href="https://www.facebook.com/RacepassUSA/"><img style="width:35px" src="/static/imgs/fb_icon.png"  /></a>
                <!-- <a class="icon" href="#"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a> -->
                <a href="https://twitter.com/racepassusa?lang=en"><img style="width:35px" src="/static/imgs/twitter_icon.png"  /></a>
                <!-- <a class="icon" href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a> -->
              </div>
            </div>
          </div>
          
          
        </div>
        <div id="footer-bottom" class="container">
          <div class="row justify-content-between">
            <div class="col">
              <div class="copyright">2017 Racepass Inc. 450 Franklin Street, Mountain View, CA 94041</div>
            </div>
            <div class="col col-lg-6 right terms-section hide-on-mobile">
              <router-link to="/terms">Terms of Use</router-link>
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
	background: #323237;
	padding: 40px 15px 5px 15px;
  margin-top: 60px;
}
footer .disclaimer {
	margin-top: 33px;
	font-size: 12px;
  color: #9B9B9B;
  font-weight: 300;
}
#footer-top {
	border-bottom: 0.5px solid #FFFFFF;
	padding: 0px 0px 10px 0px;
}
.right {
  text-align: right;
}
.bottom-menu {
  display: inline-block;
	font-size: 14px;
	padding: 0px 10px 0px 0px;
}
.social {
  display: inline-block;
}
.bottom-menu .header {
	font-size: 16px;
	font-weight: 900;
  color: #FFFFFF;
  line-height: 22px;
}
ul.bottom-menu {
  margin: 0px;
}
.bottom-menu li {
	list-style-type: none;
	margin-bottom: 8px;
  color: #FFFFFF;
  font-weight: 300;
}
#footer-bottom {
	text-align: center;
	padding: 15px 0px 5px 0px;
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
