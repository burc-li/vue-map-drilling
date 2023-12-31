import Vue from 'vue'
import App from './App.vue'
import createRouter from '@/router'
import '@/assets/styles/reset.less'

Vue.config.productionTip = false
const router = createRouter()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
