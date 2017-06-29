<template>
<div v-bind:class="{ onHome: $route.path == '/' }">
  <modal classes="rp-modal" :adaptive="true" :height="450" :width="750" name="login-header">
    <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('login-header')"><span aria-hidden="true">&times;</span></button>
    <login :isCreation="false" />
  </modal>
  <nav id="landing-nav">
    <router-link to="/"><img src="/static/imgs/logo2x.jpg" id="logo" /></router-link>
    <ul id="primary-menu">
      <li id="menu-about"><router-link to="/about">About Us</router-link></li>
      <li class="hide-on-mobile" id="menu-find-races" v-scroll-to="'#choose-from, 0px'"><router-link to="/#choose-from">Find Races</router-link></li>
      <li class="hide-on-mobile" id="menu-explore-passes" v-scroll-to="'#choose-pass, 0px'"><router-link to="/#choose-pass">Explore Passes</router-link></li>
      <li class="hide-on-mobile" id="menu-faq"><router-link to="/faq">FAQ</router-link></li>
      <li id="menu-blog"><a href="https://medium.com/racepass" target="_blank">Blog</a></li>
      <li id="menu-directors"><router-link to="/race-directors">Race Directors</router-link></li>
      <li role="separator" class="divider"></li>
      <li class="hide-on-mobile" v-scroll-to="'#choose-pass, 0px'"><router-link to="/#choose-pass"><div class="button">Get Racepass</div></router-link></li>
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

<style scoped>
#landing-nav {
	padding: 15px 15px 0px 0px;
	margin-bottom: 0px;
  overflow: hidden;
}
.onHome {
  margin-top: 38px;
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
  margin-bottom: 10px;
}
#primary-menu li {
  display: inline-block;
  height: 30px;
  margin-left: 5px;
}
@media screen and (max-width: 800px) {
  #primary-menu li.hide-on-mobile {
    display: none;
  }
}
.hollow {
  cursor: pointer;
}
</style>
