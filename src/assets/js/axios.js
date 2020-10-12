import axios from 'axios'
const myAxios = {}
myAxios.install = (Vue) => {
     let fn = axios.create({
         baseURL:`http://127.0.0.1:8888/api/private/v1/`,
         headers:{'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MDI0NjQ5ODksImV4cCI6MTYwMjU1MTM4OX0.0r45P-Ks6lsY4tmHWqGWP3x0X70BDzJEidhM8QNWQcw'}
     })
     Vue.prototype.$myHttp = fn
}

export default myAxios