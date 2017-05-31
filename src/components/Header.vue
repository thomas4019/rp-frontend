<template>
<nav id="landing-nav">
  <router-link to="/"><img src="../assets/logo2x.jpg" id="logo" /></router-link>
  <ul id="primary-menu">
    <li id="menu-about"><router-link to="/about">About</router-link></li>
    <li class="hide-on-mobile" id="menu-find-races"><a href="/#choose-from">Find Races</a></li>
    <li class="hide-on-mobile" id="menu-explore-passes"><a href="/#choose-pass">Explore Passes</a></li>
    <li class="hide-on-mobile" id="menu-faq"><a href="/#faq">FAQ</a></li>
    <li id="menu-blog"><a href="https://medium.com/racepass" target="_blank">Blog</a></li>
    <li id="menu-directors"><router-link to="/race-directors">Race Directors</router-link></li>
    <li role="separator" class="divider"></li>
    <li class="hide-on-mobile" ><a id="get-racepass-button" class="button" href="/#choose-pass">Get Racepass</a></li>
    <li role="separator" class="divider"></li>
    <li><button class="hollow" @click="login()">Login</button></li>
  </ul>
</nav>
</template>

<script>
export default {

}
</script>

<style>
#landing-nav {
	padding: 15px 15px 8px 0px;
	margin-bottom: 0px;
  overflow: none;
}
#logo {
	width: 160px;
	margin-top: 3px;
	margin-left: 15px;
}
#logo-mini {
	height: 32px;
}
#primary-menu {
  float: right;
  padding-left: 10px;
}
#primary-menu li {
  display: inline;
  margin-left: 5px;
}
@media screen and (max-width: 800px) {
  #primary-menu li.hide-on-mobile {
    display: none;
  }
}
</style>
