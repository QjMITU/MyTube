<template>
  <div class="base_container">
    <CommonHeader></CommonHeader>
    <div style="padding-top: 65px;width: 100%;height: 95px;padding-left: 300px;line-height: 40px;box-sizing: border-box">
      {{ videoInfo.videoTitle }}
    </div>
    <div style="width: 100%;background-color: #475669">
      <div class="play_box">
        <VideoPlayer ref="player"></VideoPlayer>
      </div>
    </div>
    <div style="margin-bottom: 5px" v-if="videoType">
      <div class="title">播放列表</div>
      <ul class="play_list">
        <li v-for="(item,index) in playList" @click="play(item.videoId,item.collection)" :class="[episode===index+1?'playing':'noplaying']">
          第{{ index+1 }}集
        </li>
      </ul>
    </div>

<!--    <div class="ad">广告</div>
    <div class="title">推荐动漫</div>
    <div class="good_video">
      <ul>
        <li class="box">
          <div class="box_img">

          </div>
          <div class="box_title">

          </div>
        </li>
      </ul>
    </div>-->

    <CommentBox :owner="videoInfo.ownerName" ref="comment"></CommentBox>

  </div>
</template>

<script>
import VideoPlayer from "@/components/templates/VideoPlayer.vue";
import CommonHeader from "@/components/templates/CommonHeader.vue";
import CommentBox from "@/components/templates/CommentBox.vue";
export default {
  name: "PlayView",
  components: {VideoPlayer,CommonHeader,CommentBox},
  data(){
    return{
      mtb:'',
      collection: '',
      videoInfo:'',
      episode:0,
      playList:[]
    }
  },
  computed:{
    videoType(){
      return this.collection === '1'
    }
  },
  methods:{
    play(mtb,collection){
      if (mtb===this.mtb){
        return
      }
      this.initData(mtb,collection)
      this.$router.push({name:'play',query:{mtb:mtb,collection:collection}})
      this.$refs.player.initData(mtb)
      this.$refs.comment.initData(mtb)
    },
    initData(mtb,collection){
      this.$api.video.getVideoInfo(mtb).then(res=>{
        this.videoInfo = res.data
        this.episode = this.videoInfo.episode
        this.mtb = this.videoInfo.videoId
        if (collection ==='1'){
          this.$api.video.getCollectionVideoList(res.data.collectionId).then(res=>{
            this.playList = res.data
          })
        }
      })
    }
  },
  created(){
    this.mtb = this.$route.query.mtb
    this.collection = this.$route.query.collection
    this.initData(this.mtb,this.collection)

  }
}
</script>

<style scoped>
.play_box{
  width: 60%;
  height: 500px;
  margin: 0 auto;
}
.ad{
  width: 90%;
  margin: 20px auto 0;
  height: 80px;
}
.title{
  box-sizing: border-box;
  width: 100%;
  padding-left: 120px;
  margin-bottom: 5px;
}
.play_list{
  box-sizing: border-box;
  width: 100%;
  padding:0 120px;
  overflow: auto;
}
.play_list li{
  text-align: center;
  line-height: 25px;
  float: left;
  margin-right: 5px;
  margin-bottom: 2px;
  width: 70px;
  height: 25px;
}
.play_list li:hover{
  cursor: pointer;
  background-color: #e0dada;
}
.good_video{
  box-sizing: border-box;
  width: 100%;
  margin: 10px auto 0;
  padding:0 120px;
  min-height: 268px;
}

.box{
  float: left;
  width: 144px;
  height: 256px;
  display: flex;
  flex-direction: column;
}
.box_img{
  width: 100%;
  height: 208px;
  background-color: #475669;
}
.box_title{
  width: 100%;
  height: 48px;
  background-color: lightskyblue;
}

.noplaying{
  background-color: gold;
}
.playing{
  background-color: hotpink;
}
</style>