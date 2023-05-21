<template>
  <div class="video_center">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="视频管理" name="management1">
        <el-tabs v-model="activeName1"  @tab-click="handleClick">
          <el-tab-pane label="审核中" name="inProgress">
            <el-row>
              <el-col class="row_style" v-for="(item,index) in videoList1" :key="index">
                <div class="video_image">
                  <img :src="item.videoImageUrl">
                </div>
                <div class="video_data">
                  <span style="width: 100%;height: 58%;color: black;font-size: 17px;padding-top: 1%">{{ item.videoTitle }}</span>
                  <span style="width: 100%;height: 40%;color: gray;font-size: 13px;">{{ item.createTime }}</span>
                </div>
                <div class="manage_button">
                  <el-button @click="deleted(item.videoId)">删除</el-button>
                </div>
              </el-col>
            </el-row>
            <el-empty v-if="this.videoList1.length===0"></el-empty>
          </el-tab-pane>
          <el-tab-pane label="已通过" name="passed">
            <el-row>
              <el-col class="row_style" v-for="(item,index) in videoList2" :key="index">
                <div class="video_image">
                  <img :src="item.videoImageUrl">
                </div>
                <div class="video_data">
                  <span style="width: 100%;height: 58%;color: black;font-size: 17px;padding-top: 1%">{{ item.videoTitle }}</span>
                  <span style="width: 100%;height: 40%;color: gray;font-size: 13px;">{{ item.createTime }}</span>
                </div>
                <div class="manage_button">
<!--                  <el-button @click="editVideo(item.videoId)">编辑</el-button>-->
                  <el-button @click="deleted(item.videoId)">删除</el-button>
                </div>
              </el-col>
            </el-row>
            <el-empty v-if="this.videoList2.length===0"></el-empty>
          </el-tab-pane>
          <el-tab-pane label="未通过" name="nopassed">
            <el-row>
              <el-col class="row_style" v-for="(item,index) in videoList3" :key="index">
                <div class="video_image">
                  <img :src="item.videoImageUrl">
                </div>
                <div class="video_data">
                  <span style="width: 100%;height: 58%;color: black;font-size: 17px;padding-top: 1%">{{ item.videoTitle }}</span>
                  <span style="width: 100%;height: 40%;color: gray;font-size: 13px;">{{ item.createTime }}</span>
                </div>
                <div class="manage_button">
                  <el-button @click="deleted(item.videoId)">删除</el-button>
                </div>
              </el-col>
            </el-row>
            <el-empty v-if="this.videoList3.length===0"></el-empty>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: "VideoCenter",
  data(){
    return{
      activeName: 'management1',
      activeName1: 'passed',
      videoList1: [],
      videoList2: [],
      videoList3: []
    }
  },
  methods:{
    handleClick(tab,evt){
      this.initData()
    },
    initData(){
      this.$api.video.getUserVideoList(this.activeName1).then(res=>{
        switch (this.activeName1){
          case "passed": this.videoList2 =res.data;break
          case "inProgress": this.videoList1 = res.data;break;
          case "nopassed":this.videoList3 = res.data
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    editVideo(id){

    },
    deleted(id){
      this.$api.video.deleted(id).then(res=>{
        if (res.code == 200) {
          this.initData()
        }
      })
    }
  },
  created() {
    this.initData()
  }

}
</script>

<style scoped>
.video_center{
  width: 85%;
  margin: 0 auto;
  min-height: 35rem;
}

.management_tabs{
  width: 100%;
  height: 75px;
  display: flex;
}
.management_tabs span{
  display: inline-block;
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
}

.management_tabs span:hover{
  cursor: pointer;
  color: aqua;
}

.row_style{
  height: 130px;
  display: flex;
  border-bottom: 1px solid #f2f2f2;
}
.video_image{
  width: 210px;
  height: 120px;
  margin-right: 10px;
}
.video_image:hover{
  cursor: pointer;
}
.video_data{
  width: 65%;
}
.video_data span{
  display: block;
}
.manage_button{
  box-sizing: border-box;
  padding-top: 30px;
}
</style>
