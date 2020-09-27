import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const components = {
}

new Vue({
  router,
  store,
  components,
  render: h => h(App)
}).$mount('#app')
