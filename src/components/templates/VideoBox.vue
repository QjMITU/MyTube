<template>
  <div style="width: 100%;height: 70%">
    <div id="video" v-if="record===2">
      <div v-for="(item,index) in loadInfo.showVideos" class="fl video_item" :key="index">
        <div class="video_cover" @click=playVideo(item.videoId,item.collection)>
          <img :src="item.videoImageUrl" :alt="item.description">
<!--          <div class="video_info">
            <div class="numbox">
              <div class="viewnum"><i></i>{{ item.viewNum }}</div>
              <div class="bulletnum"><i></i>{{ item.viewNum }}</div>
            </div>
            <span class="playlong"><i></i>33:00</span>
          </div>-->
        </div>
        <div class="video_content">
          <div class="video_descript">
            {{ item.description }}
          </div>
          <div class="video_owner">
            {{ item.ownerName }} {{ item.createTime }}
          </div>
        </div>
      </div>
    </div>

    <div class="collection" v-else-if="record===1">
      <div class="collection_item" v-for="(item,index) in loadInfo.showVideos" :key="index">
        <div class="collection_image"><img :src="item.cover" @click="playCollection(item.id)"></div>
        <div class="collection_name">{{ item.name }}</div>
        <div class="collection_sign">{{ item.description }}</div>
      </div>
    </div>


    <div class="load_box" v-if="loadInfo.loading">loading...</div>
    <div class="load_box" v-if="loadInfo.disableLoading">这么多都没有你喜欢的呀！！！</div>
  </div>

</template>

<script>
	export default{
    props:{
      record: {
        type:Number,
        default:2   //默认加载短视频
      }
    },
		data() {
			return {
        loadInfo:{
          showVideos:[],  //展示视频数组
          loading: false,   //加载中标识
          disableLoading: false,    //加载全部数据后标识
          loadIndex: 1,    //数据分页下标
          belong: '',//所属于页面
        }
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
      //滚动到底部继续加载数据方法
      loadShowVideoMore(){
        //加载下一页的数据
        this.loadInfo.loadIndex+=1
        this.$api.video.indexShow(this.loadInfo.loadIndex).then(res=>{
          if (res.code === 200){
            //更新页面数据
            this.loadInfo.showVideos = this.loadInfo.showVideos.concat(res.data)
            this.loadInfo.disableLoading =  res.data.length<15
            this.loadInfo.loading = false
            //更新缓存数据
           this.$store.commit('setLoadInfo',this.loadInfo)
          }
        }).catch(error=>{
          console.log("首页视频后续数据时出错")
          console.log(error)
          this.loadInfo.loading = false
          this.loadInfo.disableLoading = true
        })
      },
      //首页无限加载
      windowScroll(){
        let scrollTop = document.documentElement.scrollTop
        let scrollHeight = document.documentElement.scrollHeight
        let clientHeight = document.documentElement.clientHeight
        if (scrollHeight - clientHeight - scrollTop ===0){
          //滚动到底部触发，当存在数据且不处于加载状态时，执行加载方法
          if (!this.loadInfo.disableLoading&&!this.loadInfo.loading){
            this.loadInfo.loading = true
            this.loadShowVideoMore()
          }
        }
      }
		},
    created() {
      const loadingInfo = this.$store.state.loadInfo
      const belongName = this.$router.currentRoute.fullPath
      //如果缓存中有数据，装载数据
      if (loadingInfo!=null && belongName === loadingInfo.belong){
        this.loadInfo = loadingInfo
      }else{
        //请求数据，loadIndex = 1
        if (this.record === 2){
          this.$api.video.indexShow(this.loadInfo.loadIndex).then(res=>{
            if (res.code === 200){
              //返回正常
              this.loadInfo.showVideos = res.data
              this.loadInfo.belong = belongName
              this.$store.commit('setLoadInfo',this.loadInfo)
            }
          }).catch(error=>{
            console.log("首页请求视频数据时出错")
            console.log(error)
            this.loadInfo.disableLoading = true    //禁用无限加载
          })
        }else if (this.record === 1){
          const param = {
            id: null,
            userId:null,
            name:'',
            description:'',
            cover:''
          }
          this.$api.video.getVideoCollectionList(param).then(res=>{
            if (res.code === 200){
              //返回正常
              this.loadInfo.showVideos = res.data
              this.loadInfo.belong = belongName
              this.$store.commit('setLoadInfo',this.loadInfo)
            }
          }).catch(error=>{
            console.log("请求视频合集数据时出错")
            console.log(error)
            this.loadInfo.disableLoading = true    //禁用无限加载
          })
        }
      }
    },
    mounted() {
      window.addEventListener("scroll",this.windowScroll,true)
    },
    destroyed() {
      window.removeEventListener("scroll",this.windowScroll)
    }
  }
</script>

<style scoped>
	#video{
    display: flex;
    flex-wrap: wrap;
    color: black;
		width: 100%;
    min-height:80%;
    padding-top: 20px;
    margin: 2px auto 5px;
    overflow: auto;
  }
  .video_item{
    width: 20%;
    height: 205px;
    box-sizing: border-box;
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-bottom: 2px;
  }
  .video_cover{
    width: 100%;
    height: 150px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  .video_info{
    position: absolute;
    left: 0;
    bottom: 3px;
    width: 100%;
    height: 18px;
    display: flex;
    font-size: 15px;
    color: #99a9bf;
  }
  .numbox{
    width: 80%;
    height: 100%;
    display: flex;
  }
  .viewnum{
    width: 40px;
    margin-left: 15px;
    margin-right: 5px;
  }
  .bulletnum{
    width: 100px;
  }
  .playlong{

  }
  .video_content{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50px;
    margin-top: 5px;
  }

  .video_descript{
    height: 30px;
    font-size: 14px;
    font-weight: bold;
  }

  .video_owner{
    height: 15px;
    color: #99a9bf;
    font-size: 5px;
  }
  .load_box{
    width: 100%;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    line-height: 50px;
  }




/* 合集样式 */
  .collection{
    width: 94rem;
    min-height: 80vh;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .collection_item{
    width: 11rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
  }
  .collection_sign{
    height: 1rem;
    width: 100%;
    font-size: 15px;
    color: #e0dada;
    line-height: 1rem;
    font-weight: 100;
  }
  .collection_name{
    height: 2rem;
    width: 100%;
    font-size: 17px;
    line-height: 2rem;
    font-weight: 300;
  }
  .collection_image{
    width: 100%;
    height: 15rem;
  }
  .collection_image:hover{
    cursor: pointer;
  }

</style>
