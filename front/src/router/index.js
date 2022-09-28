
import {createRouter, createWebHistory} from 'vue-router'
import landing from '../components/landing.vue'
import login from '../components/login.vue'
import signup from "../components/SignUp.vue"
import addTVShow from "../components/addTVShow.vue";
import collection from "../components/collection.vue";


const router = createRouter({
  history:createWebHistory(),
  routes:[
    {path: '/',name:'landing',component:landing},
    {path:'/login',name:'login',component:login},
    {path:'/signup',name:'signup',component:signup},
    {path:'/addshow', name:'addshow',component:addTVShow},
    {path:'/showCollection',name:'showCollection',component:collection}
  ]
})

export default router;