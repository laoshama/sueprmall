import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//  安装自定义插件toast
Vue.use(toast)

//  解决移动端300ms延迟
/*
    使用步骤，npm下载插件，导入插件，挂载到body元素身上
*/
FastClick.attach(document.body)

const components = {
}

new Vue({
  router,
  store,
  components,
  render: h => h(App)
}).$mount('#app')
