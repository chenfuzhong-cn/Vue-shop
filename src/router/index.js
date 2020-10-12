import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'

Vue.use(Router)

const obj = (path,name,file) => {
    return {
       path,
       name,
       component: () => import(`@/components/${file}`)
    }
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        obj('/login','login','Login/login'),
        obj('/page1','page1','Pages/page1'),
        obj('/page2','page2','Pages/page2'),
      ]
    },
    obj('/login','login','Login/login'),
  ]
})
