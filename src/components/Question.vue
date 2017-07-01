<template>
  <div class="qa" :class="{collapsed: isCollapsed}" @click="isCollapsed = !isCollapsed"
      :aria-expanded="!isCollapsed" :aria-controls="id">
    <div class="question">
      <slot name="question"></slot>
    </div>
    <div :id="id" v-show="!isCollapsed" class="answer">
      <slot name="answer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rp-question',
  props: ['id'],
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
	margin: 19px 20px;
	cursor: pointer;
  color: #FFFFFF;
  line-height: 25px;
}
.question {
  padding: 17px 18px 13px 17px;
  font-size: 18px;
}
.answer {
  padding: 0px 18px 13px 17px;
	font-size: 16px;
	color: #abaeb7;
}
.qa .question::after {
  color: #0dffae;
  content: "-";
  float: right;
}
.collapsed .question::after {
  color: #0dffae;
  content: "+";
  float: right;
}
</style>
