import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/started',
    name: 'started',
    component: () => import('../layouts/mainLayout'),
    children: [
      {
        path: '/selection',
        name: 'selection',
        component: () => import(/* webpackChunkName: "home" */ '../views/selection.vue')
      },
      {
        path: '/sensors',
        name: 'sensors',
        component: () => import(/* webpackChunkName: "home" */ '../views/sensors.vue')
      },
      {
        path: '/functions',
        name: 'functions',
        component: () => import(/* webpackChunkName: "home" */ '../views/functions.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "home" */ '../views/settings.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'start',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/start.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
