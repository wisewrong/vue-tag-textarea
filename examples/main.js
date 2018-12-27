import Vue from 'vue'
import App from './App.vue'
import TagTextarea from '../packages/index'

Vue.use(TagTextarea)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
