<template>
  <div class="base_container">
    <video ref="videoPlay" autoplay controls width="100%" height="100%"></video>
  </div>
</template>

<script>
import Hls from "hls.js";

export default {
  name: "VideoPlayer",
  data(){
    return {
      url: ''
    }
  },
  methods:{
    loadPlay(){
      let hls = new Hls()
      if (Hls.isSupported()){
        hls.attachMedia(this.$refs.videoPlay)
        hls.loadSource(this.url)
        hls.on(Hls.Events.MANIFEST_PARSED,()=>{
          this.$refs.videoPlay.play()
        })
      }else{
       //当前浏览器不支持
      }
    },
    initData(mtb){
      console.log("刷新视频")
      this.$api.video.play(mtb).then(res=>{
        let url = res.data.url
        let file = res.data.m3u8
        this.url = `/api/video/ts/${url}/${file}`
        this.loadPlay()
      })
    }
  },
  mounted() {
    this.initData(this.$parent.mtb)
  }

}
</script>

<style scoped>

</style>