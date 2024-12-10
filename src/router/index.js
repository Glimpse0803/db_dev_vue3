import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Book from '../views/Book.vue'
import Video from '../views/VideoView.vue'
import Login from '../views/LoginView.vue'
import Msg from '../views/MsgView.vue'
import Model from "@/views/ModelView.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/book',
    name: 'book',
    component: Book
  },
  {
    path: '/video',
    name: 'video',
    component: Video
  },
  {
    path: '/msg',
    name: 'msg',
    component: Msg
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/model',
    name: 'model',
    component: Model
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
