import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientSearch from '../views/Search_Client.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ClientSearch',
    component: ClientSearch,
    props : true
  },
  {
    path: '/customer/:customerID',
    name: 'customer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Customer_View.vue'),
    props: true
  },
  {
    path: '/feasibility',
    name: 'Feasibility',
    component: () => import(/* webpackChunkName: "about" */ '../views/Feasibility.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Customer_Details.vue'),
    props: true
  },
  {
    path: '/network',
    name: 'Network',
    component: () => import(/* webpackChunkName: "about" */ '../views/Network_Info.vue'),
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
