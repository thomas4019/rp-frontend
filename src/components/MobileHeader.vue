<template>
<div class="mobile-header-dropdown" :class="{open: open}">
  <nav id="dropdown-nav">
    <ul>
      <li id="menu-about"><router-link to="/about">About</router-link></li>
      <li id="menu-find-races" v-scroll-to="'#choose-from, 0px'"><router-link to="/#choose-from">Find Races</router-link></li>
      <li id="menu-explore-passes" v-scroll-to="'#choose-pass, 0px'"><router-link to="/#choose-pass">Explore Passes</router-link></li>
      <li id="menu-faq"><router-link to="/faq">FAQ</router-link></li>
      <li id="menu-blog"><a href="https://medium.com/racepass" target="_blank">Blog</a></li>
      <li id="menu-directors"><router-link to="/race-directors">Race Directors</router-link></li>
      <li class="line"></li>
      <li id="support"><router-link to="/contact">Support</router-link></li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  methods: {
    showMobileMenu () {
      this.open = !this.open
    }
  },
  data () {
    return {
      open: false
    }
  },
}
</script>

<style scoped>
.mobile-header-dropdown {
  display: none;
  z-index: 99999;
  background-color: #22262B;
  width: 100%;
  height: 100%;
  z-index: 199;
}
.mobile-header-dropdown.open {
  display: block;
  position: fixed;
  top: 0px;
}
ul {
  padding: 0;
}
#dropdown-nav {
  margin-top: 95px;
}
li{
  display: none;
}
li.line {
  border: 1px solid #4A4A4A;
}
.open li{
  display: block;
  font-weight: 300;
  font-size: 18px;
  color: #9B9B9B;
  margin: 20px 32px;
  text-align: left;
}
li a {
  color: #9B9B9B;
}
</style>
