<template>
  <nav>
    <div id="menu-left" class="menu-section">
      <router-link to="/app/profile">
        <img id="logo-mini" src="/static/imgs/rplogo.jpg" />
      </router-link>
    </div>
    <div id="menu-middle" class="menu-section">
      <div v-if="results && search_focus" id="search-results">
        <div @click="selectSearchResult(result);" ng-repeat="result in results" class="result">
          <i v-if="result.type == 'race'" class="fa fa-road" aria-hidden="true"></i>
          <i v-if="result.type == 'place'" class="fa fa-map-marker" aria-hidden="true"></i>
          {{result.name}}
        </div>
      </div>
      <i class="fa fa-search" aria-hidden="true"></i>
      <input v-model="search_text" @change="searchUpdate()" @keyup="searchUpdate()" id="menu-search" placeholder="Search races or locations" type="textbox" />
    </div>
    <div id="menu-right" class="menu-section">
      <a class="link" href="/app#!/">Home</a>
      <UserMenu v-if="menu_open" />
      <div class="dropdown" @click="menu_toggle($event)">
        <img class="profile-photo" :src="photo" />
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </div>
    </div>
  </nav>
</template>

<script>
import UserMenu from '@/components/UserMenu'
function onBodyClick () {
  this.menu_open = false
}
export default {
  name: 'app-header',
  components: {
    UserMenu
  },
  methods: {
    lostFocus () {
      this.search_focus = false
    },
    menu_toggle (event) {
      this.menu_open = !this.menu_open
      event.stopPropagation()
    },
    searchUpdate () {
      this.$store.commit('search', this.search_text)
      if (this.$route.path !== '/app/search' && this.search_text) {
        this.$router.push('/app/search')
      }
    }
  },
  computed: {
    photo () {
      return this.$store.state.photo
    }
  },
  created () {
    document.getElementsByTagName('body')[0].addEventListener('click', onBodyClick.bind(this))
  },
  destroyed () {
    document.getElementsByTagName('body')[0].addEventListener('click', onBodyClick.bind(this))
  },
  data () {
    return {
      results: [],
      menu_open: false,
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
	padding: 5px;
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
@media screen and (max-width: 750px) {
  #menu-left {
	  padding: 10px 10px 0px 10px;
  }
  #menu-middle {
    padding: 0px 15px 0px 15px;
  }
  #menu-right {
    flex-basis: 100px;
    padding: 3px;
  }
  #menu-search {
    padding: 10px;
    font-size: 12px;
  }
  #menu-search i {
    font-size: 18px;
  }
}
.menu-option {
	display: inline-block;
}
.profile-photo {
	height: 40px;
	width: 40px;
	border-radius: 20px;
}
.dropdown {
	display: inline-block;
}
</style>
