<template>
  <div class="qa"
    :class="{collapsed: isCollapsed}"
    @click="isCollapsed = !isCollapsed" 
    :aria-expanded="!isCollapsed" 
    :aria-controls="id">
    <div class="row">
      <div class="col">
        <div class="question">
          <slot name="question"></slot>
        </div>
        <div :id="id" v-show="!isCollapsed" class="answer">
          <slot name="answer"></slot>
        </div>
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
	font-size: 18px;
	cursor: pointer;
  color: #FFFFFF;
  line-height: 25px;
  border-top: 0.5px solid #CECECE;
}
.question {
  padding: 20px 0px 20px 0px;
  color: #4A4A4A;
  font-size: 14px;
  line-height: 19px;
  font-weight: 900;
}
.answer {
  padding: 0px 0px 13px 0px;
	font-size: 14px;
  line-height: 19px;
  font-weight: 300;
	color: #3A3A3A;
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
