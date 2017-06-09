import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import Line from './components/Line'
import Bar from './components/Bar'
import Vpn from './components/Vpn'
import Ims from './components/Ims'
window.entry = {initCharts () {}}

Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/line': {
    component: Line
  },
  '/bar': {
    component: Bar
  },
  '/vpn': {
    component: Vpn
  },
  '/ims': {
    component: Ims
  }
})

router.start(App, 'app')

window.initCharts = (obj) => {
  window.entry.initCharts(obj)
}
