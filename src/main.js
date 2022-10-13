import Vue from 'vue'
import App from './App.vue'
import createStore from './store/store'
Vue.config.productionTip = false

new Vue({
  createStore,
  render: h => h(App)
}).$mount('#app')
