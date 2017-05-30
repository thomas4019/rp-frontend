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
	border: 1px solid #979797;
	border-radius: 8px;
	font-size: 18px;
	margin: 10px 20px;
	padding: 17px 12px 10px 40px;
	cursor: pointer;
}
.answer {
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
