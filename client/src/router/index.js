import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/Navbar'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'
import '@/assets/bootstrap/css/bootstrap.min.css'
import '@/assets/bootstrap/js/jquery.min.js'
import '@/assets/bootstrap/js/bootstrap.min.js'

Vue.use(Router)
Vue.use(VeeValidate)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'navbar',
      component: Navbar
    }
  ]
})
