<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
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
/* Attribution should only be visible on the home page. */
#home #video-attribution {
  display: block;
}


/* LOGIN */
.modal-dialog {
	width: auto;
	max-width: 800px;
}
.modal-backdrop {
   background-color: white;
}
#login-container input {
	margin: 8px 20px 8px 0px;
}
#login-container button {
	margin-right: 0px;
}
#medical-container h1 {
	font-size: 18px;
	font-weight: 500;
	text-align: center;
	line-height: 25px;
	color: #ABAEB7;
	margin-bottom: 20px;
}
.modal-container {
	padding: 25px;
	background-color: #24272A;
	min-height: 400px;
	border-radius: 3px;
	margin: 25px;
}
.modal-inner {
	width: 425px;
	margin: 10px auto 15px auto;
}
.login-panel {
	display: flex;
}
#fb-login-container {
	margin-top: 50px;
}
#login-divider {
	display: flex;
	flex-direction: column;
	text-align: center;
	margin-top: 35px;
}
@media screen and (max-width: 750px) {
	.login-panel {
		display: block;
	}
	.vbar {
		display: none;
	}
	#fb-login-container {
		margin-top: 25px;
	}
	#login-divider {
		margin-top: 15px;
	}
}
#login-button {
	float: right;
	padding: 10px;
	width: 100px;
	margin-top: 5px;
	margin-right: -7px;
}

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
