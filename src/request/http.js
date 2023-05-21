import axios from 'axios'
import store from '@/store'
import router from "@/router";



const http = axios.create({timeout:60*1000*3});


http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const errorHandler=(status,data)=>{
    switch (status) {
        case 401:
            router.replace({
                path: '/auth/login',
                query: {
                    redirect :router.currentRoute.fullPath
                }
            })
            break
        case 403:
            store.commit('setToken',null)
            router.replace({
                path: '/auth/login',
                query: {
                    redirect :router.currentRoute.fullPath
                }
            })
            break
        case 404:
            router.replace({
                path:'/view/notfound',
                query:{
                    redirect:router.currentRoute.fullPath
                }
            })
            break
        default:
            // router.replace({
            //     path:'/index/first',
            //     query:{
            //         redirect:router.currentRoute.fullPath
            //     }
            // })
    }
}
http.interceptors.request.use(
    config =>{
        const token = store.state.token
        token && (config.headers.Authorization = token)
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    res=>res.data,
    error => {
        if (error.response) {
            errorHandler(error.response.status, error.response.data)
        }
        return Promise.reject(error)
    }
)

export default http
