<template>
<div v-bind:class="{ onHome: $route.path == '/' }">
  <modal classes="rp-modal" :adaptive="true" :height="450" :width="750" name="login-header">
    <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('login-header')"><span aria-hidden="true">&times;</span></button>
    <login :isCreation="false" />
  </modal>
  <nav id="landing-nav">
    <router-link to="/" class="hide-on-mobile"><img src="/static/imgs/logo_transparent.png" id="logo" /></router-link>
    <ul id="primary-menu">
      <li class="hide-on-desktop" id="logo-mobile" ><router-link to="/"><img src="/static/imgs/logo_mobile.png"/></router-link></li>
      <li class="hide-on-mobile" id="menu-about"><router-link to="/about">About</router-link></li>
      <li class="hide-on-mobile" id="menu-find-races" v-scroll-to="'#choose-from, 0px'"><router-link to="/#choose-from">Find Races</router-link></li>
      <li class="hide-on-mobile" id="menu-explore-passes" v-scroll-to="'#choose-pass, 0px'"><router-link to="/#choose-pass">Explore Passes</router-link></li>
      <li class="hide-on-mobile" id="menu-faq"><router-link to="/faq">FAQ</router-link></li>
      <li class="hide-on-mobile" id="menu-blog"><a href="https://medium.com/racepass" target="_blank">Blog</a></li>
      <li class="hide-on-mobile" id="menu-directors"><router-link to="/race-directors">Race Directors</router-link></li>
      <li v-scroll-to="'#choose-pass, 0px'"><router-link to="/#choose-pass"><div id="getracepass" class="button shadowed">Get Racepass</div></router-link></li>
      <li id="login-button"><button class="hollow shadowed" @click="$modal.show('login-header')">Login</button></li>
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
	padding: 13px 15px 0px 0px;
	margin-bottom: 0px;
  overflow: hidden;
}
.onHome {
  margin-top: 38px;
}
#logo {
	width: 140px;
	margin-left: 19px;
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
  margin-left: 15px;
  font-weight: 900;
}
#primary-menu button,
#primary-menu .button {
  padding: 6px 15px;
}
@media screen and (max-width: 799px) {
  ul {
    margin-top: 15px;
    text-align: center;
    width: 100%;
  }
  #logo-mobile {
    float: left;
    margin: 0px 0px;
  }
  #login-button {
    float:right;
    margin: 0px 0px;
  }
  #login-button button {
    font-size: 12px;
    font-weight: 900;
    line-height: 16px;
  }
  #getracepass{
    font-size: 12px;
    font-weight: 900;
    line-height: 16px;
  }
}
.hollow {
  cursor: pointer;
}
nav li {

} 
</style>
<style>
.shadowed {
  -webkit-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.25);
}
</style>
