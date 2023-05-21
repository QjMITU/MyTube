<template>
  <div class="comment_box">
    <div class="comment_header">
      <div class="comment_tip">
        <div style="font-size: 20px;font-weight: bold;margin-right: 20px">评论</div>
        <span style="font-size: 15px;color: gray">{{ commentNum }}</span>
        <div style="margin-left: 30px;display: flex">
          <el-button type="text">最新</el-button>
          <div style="margin: 0 10px">|</div>
          <el-button type="text">最热</el-button>
        </div>
      </div>
      <div class="comment_input">
        <el-avatar shape="circle" class="comment_avatar_root" :src="userInfo.avatar">登录</el-avatar>
        <div class="input_box">
          <el-input style="width: 100%;height: 100%" type="textarea" placeholder="请输入内容" :rows="3" maxlength="51" show-word-limit resize="none" :disabled="disabled" v-model="videoComment.comment"></el-input>
          <div class="input_nologin_cover" v-if="disabled">
            <span>请登录之后在评论吧  </span>
            <span @click="jump" class="login">登录</span>
          </div>
        </div>
        <el-button style="width: 75px;height: 70px;margin-left: 20px" :disabled="disabled" @click="submit">发布</el-button>
      </div>
    </div>

    <div class="comment_list" v-if="commentList.length!=0">
      <CommentList v-for="(comment,index) in commentList" :index="index" :key="index" :comment="comment" :owner="owner"></CommentList>
    </div>

    <div class="comment_list" v-if="commentList.length==0">
      <span style="display: inline-block;width: 100%;height: 100px;line-height: 100px;text-align: center">还没有评论，快来抢沙发吧!!</span>
    </div>
  </div>
</template>

<script>
import CommentList from "@/components/templates/CommentList.vue";
export default {
  components:{
    CommentList
  },
  name: "CommentBox",
  props:{
    owner:String
  },
  data() {
    return {
      disabled:false,
      videoComment:{
        userName:'',
        userAvatar:'',
        toUserName:'',
        mtb:'',
        parentId:0,
        comment:'',
        owner:'0',
        thumbUpNum: 0,
        thumbDownNum: 0
      },
      userInfo:'',
      commentList:[],
      commentNum:0
    }
  },
  methods: {
    submit(){
      const userInfo = this.$store.state.userInfo
      this.videoComment.userName = userInfo.userName
      this.videoComment.mtb =this.$route.query.mtb
      this.videoComment.userAvatar = userInfo.avatar
      if (this.owner ===userInfo.userName){
        this.videoComment.owner = '1'
      }
      this.$api.comment.submitComment(this.videoComment).then(res=>{
        if (res.code === 200){
          this.videoComment.comment =''
          this.initData(this.$route.query.mtb)
          this.$message({
            message:'回复成功',
            type:'success'
          })
        }
      })
    },
    updateComment(){
      this.$api.comment.getVideoCommentNum(this.$route.params.mtb).then(res=>{
        this.commentNum = res.data
      })
      let params = {
        'mtb': this.$route.query.mtb
      }
      if (this.$store.state.userInfo){
        params.userId = this.$store.state.userInfo.userId
        this.userInfo = this.$store.state.userInfo
      }
      this.$api.comment.getVideoComment(params).then(res=>{
        this.commentList = res.data
      })
    },
    initData(mtb){
      this.$store.commit('setcommentIndex',-1)
      if (!this.$store.state.userInfo){
        this.disabled=true
      }
      let params = {
        'mtb': mtb
      }
      if (this.$store.state.userInfo){
        params.userId = this.$store.state.userInfo.userId
        this.userInfo = this.$store.state.userInfo
      }
      this.$api.comment.getVideoComment(params).then(res=>{
        console.log(res)
        this.commentList = res.data
      })

      this.$api.comment.getVideoCommentNum(mtb).then(res=>{
        this.commentNum = res.data
      })
    },
    //登录跳转
    jump(){
      console.log(this.$router.currentRoute.fullPath)
      this.$router.push(
          {
            path:'/auth/login',
            query:{redirect:this.$router.currentRoute.fullPath}
          }
      )
    }
  },
  created() {
    this.initData(this.$parent.mtb)
  }
}
</script>

<style scoped>
.comment_box{
  width: 90%;
  margin: 0 auto;
}
.comment_header{
  width: 100%;
  margin-bottom: 20px;
}
.comment_tip{
  width: 100%;
  height: 60px;
  display: flex;
  line-height: 60px;
}
.comment_input{
  width: 100%;
  height: 70px;
  display: flex;
}
.input_box{
  width: 85%;
  position: relative;
}
.input_nologin_cover{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 70px;
  background-color: #475669;
  color: lightskyblue;
}
.input_nologin_cover a:hover{
  color: gold;
}
.comment_list{
  width: 100%;
  min-height: 300px;
}
.login:hover{
  cursor: pointer;
  color: yellow;
}
</style>
