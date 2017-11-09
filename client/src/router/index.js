import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import EditBlogPage from '@/components/EditBlog'
import Blog from '@/components/Blog'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'
import '@/assets/bootstrap/css/bootstrap.min.css'
import '@/assets/bootstrap/css/style/style.css'
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
      component: IndexPage
    },
    {
      path: '/:slug',
      name: 'edit_blog',
      component: EditBlogPage
    },
    {
      path: '/blog/:slug',
      name: 'blog',
      component: Blog
    }
  ]
})
