import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Login from '../components/Login.vue'
import Users from '../views/links/Users.vue'
import Main from '../components/Main.vue'
import store from '@/store'
import Office from '@/views/assets/offices/Office.vue'
import Section from '@/views/assets/sections/Section.vue'
import Asset from '@/views/assets/asset/Asset.vue'
import Order from '@/views/assets/order/Order.vue'
import AssetView from '@/views/assets/asset/AssetView.vue'
import Assign from '@/views/assets/asset/Assign.vue'
import Workshop from '@/views/assets/asset/Workshop.vue'
import Disposed from '@/views/assets/asset/Disposed.vue'
import Unassign from '@/views/assets/asset/Unassign.vue'
import View from '@/views/assets/sections/View.vue'
import List from '@/views/assets/user/List.vue'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
name: 'main',
component: Main,
children: [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name:'login'
        })
      }
      next()
    }
  },
  { path: '/users',name:'users',component: Users },
  {path: '/offices',name:'offices',component:Office},
  {path: '/sections',name:'sections',component:Section},
  {path: '/section-view/:id',name:'view',component:View,props: true},
  {path: '/asset-list',name:'asset-list',component:Asset},
  {path: '/order-list',name:'orders',component:Order},
  {path: '/workshop',name:'workshop',component:Workshop},
  {path: '/disposed',name:'disposed',component:Disposed},
  {path: '/asset/:id',name:'asset-view',component:AssetView,props: true},
  {path: '/assign/:id',name:'asset-assign',component:Assign,props: true},
  {path: '/unassign/:id',name:'asset-unassign',component:Unassign,props: true},
  {path: '/user-list',name:'user',component:List},
]
  },
  
  // {
  //   path: '/about',
  //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes,
 
})

export default router
