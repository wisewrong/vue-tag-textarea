<template>
  <div class="w-tools">
    <span class="w-tools__item"
      v-for="(item, index) in tools"
      :key="index"
      @click="test($event)">
      {{config[item].title}}
    </span>
  </div>
</template>

<script>
import config from '../../config/tools.js'
export default {
  name: 'wEditorTools',
  data () {
    return {
      config
    }
  },
  props: {
    tools: {
      type: Array,
      default () {
        return []
      }
    },
    rang: {
      type: Object,
      default () {
        return null
      }
    }
  },
  mounted () {
    console.log(this.tools)
  },
  methods: {
    test (e) {
      e.preventDefault();
      e.stopPropagation();
      let sel = window.getSelection()
      console.log('getSelection', sel)
      // document.execCommand('bold', 'false', null);
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
