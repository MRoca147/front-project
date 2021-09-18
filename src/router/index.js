import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Auth/Register.vue'
import Login from '../components/Auth/Login.vue'
import Home from '../components/Home/Main.vue'
//import store from '../store/store'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/registro',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
