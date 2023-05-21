import base from '@/request/base'
import http from '@/request/http'


const comment = {
    submitComment(comment){
        return http.post(`${base.dev}/comment`,comment)
    },
    getVideoComment(params){
        return http.get(`${base.dev}/comment`, {
            params:params
        })
    },
    getVideoCommentNum(mtb){
        return http.get(`${base.dev}/comment/data?mtb=${mtb}`)
    },
    deleteComment(id){
        return http.delete(`${base.dev}/comment?cid=${id}`)
    },
    thumbup(commentStatus){
        return http.put(`${base.dev}/comment/thumbup`,commentStatus)
    }
}

export default comment