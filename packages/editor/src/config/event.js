// 工具栏事件处理函数 event.js

export default {
  handleBlod(e) {
    console.log('加粗')
    e.preventDefault()
    document.execCommand('bold', 'false', null);
  },
  handleItalic(val) {
    console.log('Italicccccc', val)
  }
}
