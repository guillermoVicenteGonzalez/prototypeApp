
import {createRouter, createWebHistory} from 'vue-router'
import landing from '../components/landing.vue'
import login from '../components/login.vue'
import signup from "../components/SignUp.vue"


const router = createRouter({
  history:createWebHistory(),
  routes:[
    {path: '/',name:'landing',component:landing},
    {path:'/login',name:'login',component:login},
    {path:'/signup',name:'signup',component:signup}
  ]
})

export default router;