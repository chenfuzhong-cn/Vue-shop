import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = (path,name,file,redirect,children) => {
    return {
       path,
       name,
       component: () => import(`@/components/${file}`),
       redirect,
       children,
    }
}

/* router 实例 */
const route =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      children: []
    },
    router('/login','login','Login/login'),
    /* 重定向要在子组件之前 */
    router('/home','home','Home/home','/welcome',new Array(
      /* 欢迎页 */
      router('/welcome','welcome','Home/welcome'),
      /* 用户列表 */
      router('/users','users','User/users'),
      /* 权限列表 */
      router('/rights','rights','Rights/rights'),
      /* 角色列表 */
      router('/roles','roles','Rights/roles'),
      ))
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

