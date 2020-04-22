import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Portfolio from "../views/Portfolio";
import Stocks from "../views/Stocks";
import Authentication from "../views/Authentication";
import store from  "../store"

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks
  },
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication,
    beforeEnter(to, from, next) {
      if (!store.state.loggedUserData.idToken){
        next()
      } else {
        next('/')
      }
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
