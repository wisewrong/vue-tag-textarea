// 工具栏配置项 tools.js

import events from './event'

export default {
  blod: {
    icon: '',
    title: '加粗',
    event: events.handleBlod
  },
  italic: {
    icon: '',
    title: '斜体',
    event: events.handleItalic
  },
  underline: {
    icon: '',
    title: '下划线',
    event: events.handleItalic
  },
  through: {
    icon: '',
    title: '删除线',
    event: events.handleItalic
  }
}
