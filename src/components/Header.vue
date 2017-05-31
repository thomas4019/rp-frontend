<template>
<div>
  <modal classes="rp-modal" :adaptive="true" :height="450" :width="750" name="login-header">
    <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('login-header')"><span aria-hidden="true">&times;</span></button>
    <login :isCreation="false" />
  </modal>
  <nav id="landing-nav">
    <router-link to="/"><img src="../assets/logo2x.jpg" id="logo" /></router-link>
    <ul id="primary-menu">
      <li id="menu-about"><router-link to="/about">About</router-link></li>
      <li class="hide-on-mobile" id="menu-find-races"><a href="/#choose-from">Find Races</a></li>
      <li class="hide-on-mobile" id="menu-explore-passes"><a href="/#choose-pass">Explore Passes</a></li>
      <li class="hide-on-mobile" id="menu-faq"><router-link to="/faq">FAQ</router-link></li>
      <li id="menu-blog"><a href="https://medium.com/racepass" target="_blank">Blog</a></li>
      <li id="menu-directors"><router-link to="/race-directors">Race Directors</router-link></li>
      <li role="separator" class="divider"></li>
      <li class="hide-on-mobile" ><a id="get-racepass-button" class="button" href="/#choose-pass">Get Racepass</a></li>
      <li role="separator" class="divider"></li>
      <li><button class="hollow" @click="$modal.show('login-header')">Login</button></li>
    </ul>
  </nav>
</div>
</template>

<script>
import Login from '@/components/Login'
export default {
  components: {
    'login': Login,
  },
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
