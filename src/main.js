import Vue from 'vue'
import router from './router'
import store from './store'
import global from './utility/index'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './static/css/reset.css'
import './static/css/common.css'
import App from './App.vue'

Vue.use(global)
Vue.use(Mint)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
