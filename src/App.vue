<template>
  <div id="app">
    <rp-header></rp-header>
    <router-view></router-view>
    <rp-footer></rp-footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
  name: 'app',
  components: {
    'rp-header': Header,
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
@import 'base.css';

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

/* MENU BAR */
.loggedin nav {
	display: flex;
	border-bottom: 0.5px solid #4A4A4A;
}
#menu-left {
	padding: 15px 15px 0px 15px;
	border-right: 0.5px solid #4A4A4A;
	flex-basis: 75px;
}
#menu-middle {
	flex: 5;
	display: flex;
	padding: 0px 15px 0px 15px;
	position: relative;
}
#menu-middle i {
	flex-basis: 25px;
	margin-top: auto;
	margin-bottom: auto;
}
#menu-right {
	flex-basis: 160px;
	padding: 0px 10px 0px 0px;
	border-left: 0.5px solid #4A4A4A;
	font-size: 28px;
	justify-content: flex-end;
	white-space: nowrap;
}
#menu-right .link {
	font-size: 18px;
	display: inline-block;
	margin: 14px 0px 0px 5px;
	color: #F7F7F7;
	text-decoration: none;
}
#menu-right * {
	padding: 5px 5px 5px 5px;
}
#menu-search {
	flex-grow: 1;
	background-color: transparent;
	border: none;
	padding: 15px;

	font-family: Avenir;
	font-size: 18px;
	font-weight: 300;
	line-height: 25px;
	color: #D8D8D8;
	outline: none;
}
#menu-search i {
	font-size: 24px;
}
.menu-option {
	display: inline-block;
}
.profile {
	height: 40px;
	width: 40px;
	border-radius: 20px;
}
.dropdown {
	display: inline-block;
}


/* LOGIN */

/* Parsley CSS */
input.parsley-success,
select.parsley-success,
textarea.parsley-success {
  color: #468847;
  background-color: #DFF0D8;
  border: 1px solid #D6E9C6;
}

input.parsley-error,
select.parsley-error,
textarea.parsley-error {
  color: #B94A48;
  background-color: #F2DEDE;
  border: 2px solid #EE9397;
}

.parsley-errors-list {
  margin: 2px 0 3px;
  padding: 0;
  list-style-type: none;
  font-size: 0.9em;
  line-height: 0.9em;
  opacity: 0;

  transition: all .3s ease-in;
  -o-transition: all .3s ease-in;
  -moz-transition: all .3s ease-in;
  -webkit-transition: all .3s ease-in;
}

.parsley-errors-list.filled {
  opacity: 1;
}

</style>
