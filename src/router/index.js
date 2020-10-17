import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = (path,name,file,children) => {
    return {
       path,
       name,
       component: () => import(`@/components/${file}`),
       children
    }
}

/* router 实例 */
const route =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      children: [
        
      ]
    },
    router('/login','login','Login/login'),
    router('/home','home','Home/home'),
  ]
})

/* 编程式导航 to，from 是对象 */
route.beforeEach((to,from,next) => {
  if(to.path === '/login') return next();
  const tokenStr = window.localStorage.getItem('token');
  /* 没有token直接跳转login */
  if(!tokenStr) return next('/login');
  /* token存在则直接放行 */
  next();
});


export default route;

