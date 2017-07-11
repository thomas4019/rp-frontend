<template>
  <div class="qa container"
    :class="{collapsed: isCollapsed}"
    @click="isCollapsed = !isCollapsed" 
    :aria-expanded="!isCollapsed" 
    :aria-controls="id">
    <div class="row">
      <div class="col-10 col-md-11">
        <div class="question">
          <slot name="question"></slot>
        </div>
        <div :id="id" v-show="!isCollapsed" class="answer">
          <slot name="answer"></slot>
        </div>
      </div>
      <div class="col align-self-center">
        <span class="sym"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rp-question',
  props: ['id'],
  methods: {
    update () {
      var hash = this.$route.hash.substr(1)
      if (hash === this.id) {
        this.isCollapsed = false
      }
    }
  },
  mounted () {
    this.update()
  },
  data () {
    return {
      isCollapsed: true
    }
  }
}
</script>

<style scoped>
.qa {
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.25);
	background-color: #323237;
	border-radius: 8px;
	font-size: 18px;
	margin: 19px 0px;
	cursor: pointer;
  color: #FFFFFF;
  line-height: 25px;
}
.question {
  padding: 17px 0px 13px 0px;
  font-size: 18px;
}
.answer {
  padding: 0px 0px 13px 0px;
	font-size: 16px;
	color: #abaeb7;
}
.qa .sym::after {
  color: #0dffae;
  content: "-";
  float: right;
}
.collapsed .sym::after {
  color: #0dffae;
  content: "+";
  float: right;
}
@media screen and (max-width: 799px) {
  .question {
    font-size: 14px;
  }
  .answer {
    font-size: 14px;
  }
}
</style>
