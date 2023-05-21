<template>
  <div class="common_box">
    <div class="create_index_gc">
      <div class="runner">
        <img src="/profile/admin/hutao.webp">
      </div>
      <div class="announcement_box">
        欢迎使用Mytube o(〃'▽'〃)o
      </div>
    </div>
    <div class="census_box">
      <div class="title">
        <span>视频数据</span>
      </div>
      <ul class="census_data">
        <li>
          <span class="name"><i></i>点赞</span>
          <span class="data">{{ census.upNum }}</span>
        </li>
        <li>
          <span class="name"><i></i>播放</span>
          <span class="data">{{ census.playNum }}</span>
        </li>
        <li>
          <span class="name"><i></i>评论</span>
          <span class="data">{{ census.commentNum }}</span>
        </li>
<!--        <li>
          <span class="name"><i></i>收藏</span>
          <span class="data">0</span>
        </li>-->
      </ul>
    </div>

    <div class="top_video">
      <div class="title">
        <span>高分视频</span>
      </div>
      <ul class="top_video_data">
        <li v-for="(item,index) in topVideoList" :key="index">
          <div class="top_video_image">
            <img :src="item.videoImageUrl">
          </div>
          <div class="top_video_title">
            <span>{{ item.videoTitle }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="top_collection">
      <div class="title">
        <span>高分合集</span>
      </div>
      <ul>
        <li v-for="(item,index) in topCollectionList" :key="index">
          <div class="top_collection_cover">
            <img :src="item.cover">
          </div>
          <div class="top_collection_name">
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Swiper,SwiperSlide} from "swiper/vue";
export default {
  components:{
    Swiper,SwiperSlide
  },
  name: "CreateIndex",
  data(){
    return{
      topVideoList:[],
      topCollectionList:[],
      census:{
        upNum:0,
        playNum:0,
        commentNum:0
      }
    }
  },
  methods:{
    initData(){
      this.$api.video.getTopVideo().then(res=>{
        this.topVideoList = res.data
      }).catch(err=>{
        console.log(err)
      })

      this.$api.video.getTopCollection().then(res=>{
        this.topCollectionList = res.data
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped>
.create_index_gc{
  width: 90%;
  height: 240px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  background-color: white;
}
.runner{
  width: 45%;
  margin-right: 50px;
}
.announcement_box{
  width: 45%;
  text-align: center;
  font-size: larger;
  font-weight: bold;
  color: blueviolet;
  line-height: 240px;
}

.census_box{
  margin: 20px auto 0;
  padding: 20px;
  width: 90%;
  height: 280px;
  background-color: white;
  border-radius: 4px;
}

.top_video{
  width: 90%;
  margin: 20px auto 0;
  padding: 20px;
  height: 280px;
  background-color: white;
  border-radius: 4px;
}
.title{
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  padding-left: 10px;
  color: blueviolet;
  font-size: 18px;
  font-weight: 600;
}
.census_data{
  width: 100%;
}
.census_data li{
  width: 16rem;
  height: 8rem;
  float: left;
  background-color: #9a6e3a;
  margin: 20px;
  border-radius: 4px;
}
.name{
  display: inline-block;
  height: 3rem;
  line-height: 3rem;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 800;
}
.data{
  display: block;
  height: 4rem;
  line-height: 4rem;
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  color: dodgerblue;
}

.top_video_data{
  width: 100%;
}
.top_video_data li{
  width: 13.8rem;
  float: left;
  margin: 2px 8px;
}
.top_video_image{
  width: 100%;
  height: 150px;
}
.top_video_image:hover{
  cursor: pointer;
}
.top_video_title{
  margin-top: 5px;
  width: 100%;
  height: 50px;
}
.top_collection{
  width: 90%;
  margin: 20px auto 0;
  padding: 20px;
  height: 380px;
  background-color: white;
  border-radius: 4px;
}
.top_collection_cover{
  width: 100%;
  height: 270px;
}
.top_collection_cover:hover{
  cursor: pointer;
}
.top_collection_name{
  margin-top: 5px;
  width: 100%;
  height: 50px;
}
.top_collection ul li{
  width: 12rem;
  float: left;
  margin: 4px 22px;
}
</style>
