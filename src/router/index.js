import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import WeatherReport from '../components/WeatherReport.vue'
import SavedLocations from '../views/SavedLocations.vue'
import Login from '../views/Login'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/home'
    },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/weather/report/:city',
    name: 'WeatherReport',
    component: WeatherReport,
    props: true
  },
  {
    path: '/user/:userId/weather/favourite/locations',
    name: 'SavedLocations',
    component: SavedLocations,
    props: true,
    beforeEnter: (to, from, next) => {
      if(to.name==='SavedLocations' && sessionStorage.getItem('isAuthenticated')){
        next()
      }else{
        next({name:'Login'})
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'PageNotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
