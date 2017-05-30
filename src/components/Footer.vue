<template>
  <footer v-once>
    <div id="footer-top" class="container">
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
      <a href="https://heapanalytics.com/?utm_source=badge" rel="nofollow"><img style="width:108px;height:41px" src="//heapanalytics.com/img/badge.png" alt="Heap | Mobile and Web Analytics" /></a>
    </div>
    <div id="footer-bottom">
      <router-link to="/terms">Terms of Use</router-link>
      <router-link to="/privacy">Privacy Policy</router-link>
      <div class="copyright">2017 Racepass Inc. 450 Franklin Street, Mountain View, CA 94041</div>
      <p class="container disclaimer">All names, logos, and brands of third parties (e.g., race organizers) listed on our site are trademarks of their respective owners. Racepass and its products and services are not endorsed by, sponsored by, or affiliated with these third parties.  Our use of these names, logos, and brands is for identification purposes only, and does not imply any such endorsement, sponsorship, or affiliation.</p>
      <p v-if="$route.path=='/'" class="container disclaimer">
        <a href="https://creativecommons.org/licenses/by/3.0/legalcode" target="_blank">CC BY</a> footage from
        <a href="https://www.youtube.com/watch?v=B3ne77AoLog" target="_blank">BGM 2016 - Drone Teaser</a>,
        <a href="https://www.youtube.com/watch?v=thXGgK_APFU" target="_blank">United NYC Half 2016</a>,
        <a href="https://www.youtube.com/watch?v=PVBGw1mlCxM" target="_blank">Marine Corps Half Marathon 2015</a>,
        <a href="https://www.youtube.com/watch?v=z2Zw0ajsEoM" target="_blank">Ramstein Half Marathon</a>,
        <a href="https://www.youtube.com/watch?v=7WkpyuaH3JE" target="_blank">#IComrades New Balance South Africa Comrades Marathon 2015</a>.
      </p>
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
	padding: 15px 15px 5px 15px;
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
}
footer .disclaimer {
	margin-top: 10px;
	font-size: 10px;
}
#footer-top {
	border-bottom: .5px solid white;
  height: 111px;
	padding: 0px;
}
.bottom-menu {
	float: left;
	font-size: 12px;
	padding: 0px 10px 0px 10px;
}
.bottom-menu .header {
	font-size: 16px;
	font-weight: bold;
}
.bottom-menu li {
	list-style-type: none;
	margin-bottom: 8px;
}
#footer-bottom {
	text-align: center;
	padding: 15px 15px 5px 15px;
}
#footer-bottom a {
	font-size: 14px;
}
.copyright {
	font-weight: lighter;
	margin-top: 8px;
}
footer a {
	padding: 10px;
}
#footer-bottom .disclaimer a {
  padding: 0;
  font-size: inherit;
}
#video-attribution {
  display: none;
}
</style>
