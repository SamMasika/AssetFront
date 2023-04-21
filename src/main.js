import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import Toasted from 'vue-toasted'
import SweetAlert from './plugins/sweetalert'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.use(SweetAlert);
Vue.use(Toasted)


// import 'vuetify/dist/vuetify.min.css'

require ('@/store/subscriber')

Vue.use(vuetify, {
  iconfont: 'md'
})



axios.defaults.baseURL='http://localhost:8000/api'

Vue.config.productionTip = false

store.dispatch('auth/attempt',localStorage.getItem('access_token'))
.then(()=>{
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})

