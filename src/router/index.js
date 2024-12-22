import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import Book from '@/views/Book.vue';
import Video from '@/views/VideoView.vue';
import Login from '@/views/LoginView.vue';
import Msg from '@/views/MsgView.vue';
import Article from "@/views/ArticleView.vue";
import Play from "@/views/VideoplayView.vue";


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
    path: '/videos',
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
    path: '/article',
    name: 'article',
    component: Article
  },
  {
    path: '/play',
    name: 'play',
    component: Play,
    props: true  // 使路由参数作为 props 传递给组件
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const Username = sessionStorage.getItem('Username')
//   const Password = sessionStorage.getItem('Password')

  // 检查 Session Storage 中的值
//   if (!Username && !Password && to.path !== '/login') {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
