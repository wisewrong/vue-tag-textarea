import Editor from './src/main.vue'

Editor.install = function (Vue) {
  Vue.component(Editor.name, Editor)
}

export default Editor
