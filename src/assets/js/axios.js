import axios from 'axios'
const myAxios = {}
myAxios.install = (Vue) => {
     let fn = axios.create({
         baseURL:`http://127.0.0.1:8888/api/private/v1/`
     })
     Vue.prototype.$myHttp = fn
}

export default myAxios