<template>
  <div id="app">
    <rp-header v-if="!$route.path.includes('/app')"></rp-header>
    <rp-app-header v-if="$route.path.includes('/app')"></rp-app-header>
    <router-view></router-view>
    <rp-footer></rp-footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import AppHeader from '@/components/AppHeader'

export default {
  name: 'app',
  components: {
    'rp-header': Header,
    'rp-app-header': AppHeader,
    'rp-footer': Footer
  }
}

/*eslint-disable*/
window.fbAsyncInit = function() {
	FB.init({
		appId      : '1732893076927842',
		xfbml      : true,
		version    : 'v2.8'
	});
	FB.AppEvents.logPageView();
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>

<style>
/* VARIOUS ELEMENTS */
.callout {
	font-weight: 300;
	font-size: 36px;
	color: #D8D8D8;
	text-align: center;
	margin: 5px;
	padding: 20px;
}
.callout-small {
	font-weight: lighter;
	font-size: 16px;
	color: #F7F7F7;
	text-align: center;
	margin: 25px;
}
.vbar {
	height: 40px;
	border-right: 1px solid white;
	width: 1px;
	margin: 0px auto;
}
</style>
