<template>
  <div class="search_box">
    <div class="title">
      <span>小视频</span>
    </div>
    <ul class="video">
      <li v-for="(item,index) in this.$store.state.search.videoList" :key="index">
        <div class="img_style">
          <img :src="item.videoImageUrl" @click="playVideo(item.videoId,item.collection)">
        </div>
        <div class="name">
          <span>{{ item.videoTitle }}</span>
        </div>
      </li>
      <div style="width: 100%;text-align: center;" v-if="this.$store.state.search.videoList.length===0">
        <span>还没相关资源</span>
      </div>
    </ul>
    <div class="title">
      <span>动漫</span>
    </div>
    <ul class="collection">
      <li v-for="(item,index) in this.$store.state.search.collectionList" :key="index">
        <div class="img_style2">
          <img :src="item.cover" @click="playCollection(item.id)">
        </div>
        <div class="name">
          <span>{{ item.name }}</span>
        </div>
      </li>
      <div style="width: 100%;text-align: center;height: 100px;line-height: 100px" v-if="this.$store.state.search.collectionList.length===0">
        <span>还没相关资源</span>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchView",
  data(){
    return{
      searchData:null
    }
  },
  methods:{
    playVideo(mtb,collection){
      this.$router.push({name: 'play',query:{mtb:mtb,collection:collection}})
    },
    playCollection(collectionId){
      this.$api.video.getCollectionVideoIndex(collectionId,1).then(res=>{
        this.playVideo(res.data.videoId,res.data.collection)
      })
    },
  }
}
</script>

<style scoped>
.search_box{
  min-height: 75vh;
}
.title{
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  padding-left: 10px;
  box-sizing: border-box;
  color: blueviolet;
  font-size: 18px;
  font-weight: 600;
}
.search_box ul{
  width: 100%;
  min-height: 210px;
  box-sizing: border-box;
  padding:5px 50px;
  display: flex;
  flex-wrap: wrap;

}
.video li{
  float: left;
  width: 20%;
  height: 180px;
  box-sizing: border-box;
  padding: 0 10px;
  margin-bottom: 20px;
}
.collection li{
  float: left;
  width: 20%;
  height: 360px;
  box-sizing: border-box;
  padding: 0 25px;
  margin-bottom: 20px;
}
.img_style{
  width: 100%;
  height: 160px
}
.img_style:hover{
  cursor: pointer;
}
.img_style2{
  width: 100%;
  height: 300px;
}
.img_style2:hover{
  cursor: pointer;
}
.name{
  margin-top: 5px;
  width: 100%;
  height: 40px;
}
</style>
