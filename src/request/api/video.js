import base from '@/request/base'
import http from '@/request/http'

const video = {
    indexShow(index){
        return http.get(`${base.dev}/video/index/list?index=${index}`)
    },
    play(mtb){
        return http.post(`${base.dev}/video/play?mtb=${mtb}`)
    },
    loadingBibo(url,file){
        return http.get(`${base.dev}/video/ts/${url}/${file}`)
    },
    previewCoverUrl(url){
        return http.get(`${base.dev}/video/preview/cover?url=${url}`)
    },
    submitVideoForm(data){
        return http.post(`${base.dev}/video/submit`,data)
    },
    getVideoInfo(mtb){
        return http.get(`${base.dev}/video/info?mtb=${mtb}`)
    },
    search(sch){
        return http.get(`${base.dev}/video/search?sch=${sch}`)
    },
    deleted(mtb){
        return http.delete(`${base.dev}/video?mtb=${mtb}`)
    },




    //视频合集
    createVideoCollection(collectionForm){
        return http.post(`${base.dev}/collection`,collectionForm)
    },

    updateVideoCollection(collection){
        return http.put(`${base.dev}/collection`,collection)
    },
    getVideoCollectionList(param){
        return http.get(`${base.dev}/collection`,{params:param})
    },
    deleteCollection(id){
        return http.delete(`${base.dev}/collection/${id}`);
    },
    getCollectionVideoList(id){
        return http.get(`${base.dev}/collection/video/${id}`)
    },
    getCollectionVideoIndex(id,index){
        return http.get(`${base.dev}/collection/episode?p=${index}&cid=${id} `)
    },
    //创作中心
    getUserVideoList(type){
        return http.get(`${base.dev}/userVideo/${type}`)
    },
    getTopVideo(){
        return http.get(`${base.dev}/userVideo/top/video`)
    },
    getTopCollection(){
        return http.get(`${base.dev}/userVideo/top/collection`)
    },
    //审核中心
    getExamVideoList(page,size){
      return http.get(`${base.dev}/exam?page=${page}&size=${size}`)
    },
    passExam(pass,mtb){
        return http.put(`${base.dev}/exam?pass=${pass}&mtb=${mtb}`)
    },


}


export default video
