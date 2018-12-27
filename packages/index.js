import Textarea from './textarea/index'

const components = [
  Textarea
]

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  // window.Vue.use(install)
  install(window.Vue)
}

export default {
  install,
  Textarea
}
