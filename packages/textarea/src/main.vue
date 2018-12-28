<template>
  <div class="w-textarea" ref="wTextarea">
    <div
      class="w-textarea_input"
      ref="wTextareaContent"
      :id="contentId"
      @click="inputClick($event)"
      @focus="isLocked = true"
      @blur="isLocked = false"
      @keydown.delete="handleDelete($event)"
      @input="handleInput($event.target)"
    ></div>
    <div class="w-textarea_tools" v-if="tools.length > 0 || maxlength">
      <button class="w-textarea_tools__item"
        v-for="item in tools"
        :key="item.type"
        @click="openTagDialog(item.type)">{{item.text}}</button>
      <span :class="['w-textarea_tools__text',
        count.num < 0 ? '__danger' : '']"
        v-if="maxlength">{{count.text}}</span>
    </div>
    <div class="w-textarea_dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wTextarea',
  data() {
    return {
      // 记录currentText以计算长度
      currentText: this.value,
      // 为input区域生成随机id，当在页面上有多个组件时，用于监听光标的变化
      contentId: `content${this.getGuid()}`,
      // 输入的时候锁定，禁止更新innerHTML
      isLocked: false,
      // 记录当前选中tag的ID
      currentTagId: null,
      // 当前光标位置
      savedRange: {}
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    tag: { // 自定义模版标签的标签名
      type: String,
      // 默认使用wise作为标签名，并添加了默认样式
      // 当使用其他标签名的时候，需要另写标签样式
      default: 'wise'
    },
    tools: { // 自定义扩展功能：超链接'link'，模版标签'tag'
      type: Array,
      default () {
        return [
          { type: 'link', text: '添加超链接' },
          { type: 'tag', text: '添加模版标签' }
        ]
      }
    },
    maxlength: { // 最大输入长度
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    count () { // 字符长度记数
      let num = this.maxlength - this.currentText.length
      let text = num < 0 ? `已超出${Math.abs(num)}个字符` : `还可以输入${num}个字符`
      return { num, text }
    }
  },
  mounted() {
    // 初始化数据
    this.currentText && (this.$refs.wTextareaContent.innerHTML = this.currentText);
    // 创建模版标签的style
    this.createStyle();
    // 每次光标变化的时候，保存 range
    document.addEventListener('selectionchange', this.selectHandler);
  },
  beforeDestroy() {
    // 卸载事件
    document.removeEventListener('selectionchange', this.selectHandler);
  },
  methods: {
    updateData(text) {
      this.$emit('input', text);
    },
    createStyle() {
      // 为自定义的模版标签添加样式，使之不可编辑
      let style = document.createElement('style');
      style.innerHTML = `.w-textarea ${this.tag} {
        cursor: default;
        -webkit-user-modify: read-only !important;
      }`;
      this.$refs.wTextarea.appendChild(style);
    },
    closeModal() {
      this.form.text = '';
      this.showModal = false;
    },
    openTagDialog(type) {
      // 将事件抛给父组件处理
      // 处理后需要调用 addTag() 或者 addLink() 将内容传回来
      this.$emit('add', type)
    },
    addTag(text) {
      // 创建模版标签
      let node = document.createElement(this.tag);
      node.innerText = text;
      // 添加id便于删除
      node.id = this.getGuid();
      this.insertNode(node);
    },
    addLink(text, url) {
      // 创建a标签
      let node = document.createElement('a');
      node.innerText = text;
      node.href = url;
      node.target = 'blank';
      this.insertNode(node)
    },
    insertNode (node) { // 在内容中插入标签
      // 删掉选中的内容（如有）
      this.savedRange.deleteContents()
      // 插入链接
      this.savedRange.insertNode(node)

      // 更新双向绑定数据
      let target = this.$refs.wTextareaContent
      this.updateData(target.innerHTML);
      this.currentText = target.innerText;
    },
    handleInput(target) {
      // 即时更新数据
      this.updateData(target.innerHTML);
      this.currentText = target.innerText;
    },
    handleDelete(e) {
      // 监听“删除”事件
      if (this.currentTagId) {
        // 若已选中模版标签，直接删除dom节点
        let t = document.getElementById(this.currentTagId);
        this.$refs.wTextareaContent.removeChild(t);
        this.currentTagId = null;
        // 阻止浏览器默认的删除事件，并手动更新数据
        e.preventDefault();
        this.handleInput(e.target);
      }
    },
    inputClick(e) {
      // 监听点击事件
      this.isLocked = true;
      const TAG_NAME = e.target.nodeName;
      if (TAG_NAME === this.tag.toUpperCase()) {
        // 点击模版标签时，记录id
        this.currentTagId = e.target.id;
        e.target.className = 'active';
      } else if (this.currentTagId) {
        // 清空active样式
        let target = document.getElementById(this.currentTagId);
        target.className = '';
        this.currentTagId = null;
      } else {
        this.currentTagId = null;
      }
    },
    getGuid() {
      // 生成随机ID
      return `r${new Date().getTime()}d${Math.ceil(Math.random() * 1000)}`;
    },
    selectHandler() {
      // 监听选定文本的变动
      let sel = window.getSelection();
      let range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;

      if (
        range &&
        range.commonAncestorContainer.ownerDocument.activeElement.id ===
        this.contentId
      ) {
        this.savedRange = range;
      }
    }
  },
  watch: {
    value(val) {
      // 非锁定状态下，实时更新innerHTML
      if (!this.isLocked) {
        this.$refs.wTextareaContent.innerHTML = val;
      }
    }
  }
};
</script>

<style lang="scss">
// 给标签默认样式，不可scoped
.w-textarea {
  wise {
    color: #26a2ff;
    padding: 0 1px;
    white-space: nowrap;
    cursor: default;
    -webkit-user-modify: read-only !important;
  }

  .active {
    background: #dcdfe6;
  }
}
</style>

<style lang="scss" scoped>
$borderColor: #dcdfe6;
$bgColor: #f5f7fa;
$textColor: #666;

.w-textarea {
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid $borderColor;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;

  &_input {
    width: 100%;
    min-height: 100px;
    box-sizing: border-box;
    padding: 10px;
    line-height: 1.5;
    word-break: break-word;
    // 允许编辑，禁止富文本
    -webkit-user-modify: read-write-plaintext-only !important;

    &:focus {
      outline: none;
    }
  }

  &_tools {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid $borderColor;
    background-color: $bgColor;
    color: $textColor;
    font-size: 12px;

    &__item {
      display: inline-block;
      line-height: 1;
      padding: 5px 8px;
      margin-right: 8px;
      color: $textColor;
      cursor: pointer;
      border: 1px solid $borderColor;
      border-radius: 4px;
      background: #fff;
      transition: all 0.3s;

      &:hover {
        background: $bgColor;
        opacity: .7;
      }

      &:focus {
        outline: none;
      }
    }

    &__text {
      display: inline-block;
      line-height: 40px;
      padding: 0 8px;
      float: right;
      color: $textColor;
      cursor: default;
      transition: all 0.3s;

      &:hover {
        opacity: 1;
      }

      &.__danger {
        color: red;
      }
    }
  }
}
</style>
