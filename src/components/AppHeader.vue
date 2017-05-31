<template>
  <nav>
    <div id="menu-left" class="menu-section">
      <router-link to="/app/profile">
        <img id="logo-mini" src="../assets/rplogo.jpg" />
      </router-link>
    </div>
    <div id="menu-middle" class="menu-section">
    <div  v-if="results && search_focus" id="search-results">
      <div @click="selectSearchResult(result);" ng-repeat="result in results" class="result">
        <i v-if="result.type == 'race'" class="fa fa-road" aria-hidden="true"></i>
        <i v-if="result.type == 'place'" class="fa fa-map-marker" aria-hidden="true"></i>
        {{result.name}}
      </div>
    </div>
      <i class="fa fa-search" aria-hidden="true"></i>
      <input ng-focus="search_focus = true" ng-blur="lostFocus()" v-model="search_text" ng-keyup="$event.keyCode == 13 && search()" ng-change="search()" id="menu-search" placeholder="Search races or locations" type="textbox" />
    </div>
    <div id="menu-right" class="menu-section">
      <a class="link" href="/app#!/">Home</a>
      <div class="dropdown">
        <div style="cursor: pointer;" class="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <img class="profile" :src="photo" ></span>
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </div>
        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
          <li><a href="/app#!/registration">Update info</a></li>
          <li><a href="javascript:delete localStorage.uid; delete localStorage.token; location = '/';">Sign out</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-header',
  methods: {
    lostFocus () {
      this.search_focus = false
    }
  },
  data () {
    return {
      results: [],
      photo: '',
      search_text: '',
      search_focus: false
    }
  }
}
</script>

<style scoped>
nav {
	display: flex;
	border-bottom: 0.5px solid #4A4A4A;
}
#logo-mini {
	height: 32px;
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
</style>
