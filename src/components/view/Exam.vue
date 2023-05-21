<template>
  <div class="base_container">
    <CommonHeader></CommonHeader>
    <div class="exam_box">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="视频审核" name="exam-video">
          <el-row>
            <el-col class="row_style" v-for="(item,index) in examVideoList" :key="index">
              <div class="video_image" @click="play(item.videoId)">
                <img :src="item.videoImageUrl" alt="">
              </div>
              <div class="video_data">
                <span style="width: 100%;height: 58%;color: black;font-size: 17px;padding-top: 1%">{{ item.videoTitle }}</span>
                <span style="width: 100%;height: 40%;color: gray;font-size: 13px;">{{ item.createTime }}</span>
              </div>
              <div class="manage_button">
                <el-button @click="passExam(true,item.videoId)">通过</el-button>
                <el-button @click="passExam(false,item.videoId)">不通过</el-button>
              </div>
            </el-col>
          </el-row>
          <el-pagination
              :hide-on-single-page="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
          >
          </el-pagination>
          <el-empty v-if="this.examVideoList.length===0"></el-empty>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/templates/CommonHeader.vue";

export default {
  name: "Exam",
  components: {CommonHeader},
  data(){
    return{
      activeName: 'exam-video',
      examVideoList: [],
      currentPage: 1,
      pageSizes:[10,20,50],
      pageSize:10,
      total:0
    }
  },
  methods:{
    initData(){
      this.$api.video.getExamVideoList(this.currentPage,this.pageSize).then(res=>{
        this.examVideoList = res.data.data
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.initData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.initData()
    },
    passExam(pass,mtb){
      this.$api.video.passExam(pass,mtb).then(res=>{
        if (res.code==200)
          this.initData()
      })
    },
    play(mtb){
      this.$router.push({name: 'play',query:{mtb:mtb,collection:2}})
    }
  },
  created() {
    //防止直接访问
    if (this.$store.state.userInfo==null || !this.$store.state.userInfo.isRoot){
      this.$router.push('/index/first')
    }else{
      this.initData()
    }
  }
}
</script>

<style scoped>
.exam_box{
  width: 90%;
  margin: 0 auto;
  margin-top: 65px;
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
