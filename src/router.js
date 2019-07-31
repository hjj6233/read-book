import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('./views/Content.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/List.vue')
    }
  ]
})
