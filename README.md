# VueTagTextarea

> 可插入自定义标签的 textarea

## 安装

``` bash
$ npm install vue-tag-textarea -S
```
## 使用

在 `main.js` 文件中引入插件并注册

``` bash
# main.js
import VueTagTextarea from 'vue-tag-textarea'
Vue.use(VueTagTextarea)
```

在项目中用使用 VueTagTextarea


```js
<template>
  <w-textarea v-model="text" />
</template>
<script>
  export default {
    data () {
      return {
        text: 'demo'
      }
    }
  }
</script>
```

注意：标签为 `<w-textarea>`

## 特点
1. 可以插入自定义的标签，默认为 `<wise>`
2. 基于自定义标签，可以满足模版文案的需求

## 参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| tag | 自定义标签名 | String | wise |
| tools | 配置工具栏 | Array | [{ type: 'link', text: '添加超链接' }, { type: 'tag', text: '添加模版标签' }] |
| maxlength | 最大字符长度 | String, Number | - |

> 自定义 tag 的时候，需要添加该标签的样式


## 事件

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| add | 点击工具栏上的“添加xx”按钮时触发 | type |

## Add 事件详解
工具栏可以通过 tools 参数进行配置，tools 的元素是一个包含 type 和 text 的对象，其中 text 为工具栏按钮的文字。  
当点击工具栏按钮的时候，触发 add 事件，接收一个 type 参数，该参数为 tools 中定义的 type 属性值。  
具体的交互逻辑需要自行开发，最后需要通过 $refs 调用 VueTagTextarea 内部的 addLink() 或者 addTag() 方法，完成添加标签。  
当调用 addTag() 的时候，需要传入一个 text 参数，值为标签的文本内容。  
当调用 addLink() 的时候，需要传入 url 和 text，其中 url 为超链接地址，text 为超链接文本。  
VueTagTextarea 最终返回的值是一个 innerHTML。  
