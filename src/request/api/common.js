import base from '@/request/base'
import http from '@/request/http'


const common = {
    //登录
    login(parmas){
        return http.post(`${base.dev}/user/login`,parmas)
    },
    //获取用户信息
    getUserInfo(){
      return http.get(`${base.dev}/user`)
    },
    //更新用户信息
    updateUserInfoProperty(param,value){
        return http.put(`${base.dev}/user/edit/${param}/${value}`)
    },
    //注册
    register(parmas){
        return http.post(`${base.dev}/user/register`,parmas)
    },
    //获取验证码
    getCode(){
        return http.get(`${base.dev}/code`)
    },
    upload(formData){
        return http.post(`${base.dev}/common/upload`,formData)
    }
}

export default common
