<template>
  <div class="w-editor w-wrapper" ref="wEditor">
    <w-tools :range="savedRange" v-if="tools.length > 0" :tools="tools"></w-tools>
    <div
      class="w-input"
      ref="wEditorContent"
      contenteditable="true"
      :id="contentId"
      @click="inputClick($event)"
      @focus="isLocked = true"
      @blur="isLocked = false"
      @keydown.delete="handleDelete($event)"
      @input="handleInput($event.target)"
    ></div>
    <div class="w-footer" v-if="maxlength">
      <span :class="['w-footer__text',
        count.num < 0 ? '__danger' : '']"
        v-if="maxlength">{{count.text}}</span>
    </div>
    <div class="w-dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import wTools from './components/tools/main.vue'
export default {
  name: 'wEditor',
  components: { wTools },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
