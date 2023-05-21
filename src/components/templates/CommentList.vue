<template>
  <div class="list_box">
    <div class="comment_root">
      <el-avatar class="comment_avatar_root" :src="comment.userAvatar"></el-avatar>
      <div class="comment_root_content">
        <div class="comment_root_content_name">{{ comment.userName }} <span class="name_type" v-if="comment.owner=='1'">UP</span></div>
        <div class="content">
          {{ comment.comment }}
        </div>
        <div class="comment_data">
          <span>{{ comment.createTime }}</span>
          <span><i @click="thumbUp(comment)" class="iconfont icon_hover" :class="{'icon-dianzan':!comment.likedStatus||comment.likedStatus==='0'||comment.likedStatus==='2','icon-z-likeFill':comment.likedStatus==='1'}"></i> {{ comment.thumbUpNum }}</span>
          <span><i @click="thumbDown(comment)" class="iconfont icon_hover" :class="{'icon-chaping':!comment.likedStatus||comment.likedStatus==='0'||comment.likedStatus==='1','icon-z-nolikeFill':comment.likedStatus==='2'}"></i> {{ comment.thumbDownNum }}</span>
          <span><i class="iconfont icon-huifu"></i> {{ comment.children.length }}</span>
          <span @click="replyClick(comment.userName)" class="reply_class">回复</span>
        </div>


        <div class="comment_answer">
          <ul>
            <li v-for="item in showChildren">
              <el-avatar class="comment_avatar_small" :src="item.userAvatar"></el-avatar>
              <div class="">
                <div class="answer_content">
                  <span style="color: gray;font-size: 13px">{{ item.userName }}<span class="name_type" v-if="item.owner=='1'">UP</span></span>
                  <span style="font-size: 14px" v-if="item.toUserName">回复<i style="color: lightskyblue;font-size: 14px">@{{ item.toUserName }}</i></span>
                  <span style="font-size: 14px">{{ item.comment }}</span>
                </div>
                <div class="comment_data">
                  <span>{{ item.createTime }}</span>
                  <span><i @click="thumbUp(item)" class="iconfont icon_hover" :class="{'icon-dianzan':!item.likedStatus||item.likedStatus==='0'||item.likedStatus==='2','icon-z-likeFill':item.likedStatus==='1'}"></i> {{ item.thumbUpNum }}</span>
                  <span><i @click="thumbDown(item)" class="iconfont icon_hover" :class="{'icon-chaping':!item.likedStatus||item.likedStatus==='0'||item.likedStatus==='1','icon-z-nolikeFill':item.likedStatus==='2'}"></i> {{ item.thumbDownNum }}</span>
                  <span @click="replyClick(item.userName)" class="reply_class">回复</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="num" v-if="comment.children.length>5">
          一共{{ comment.children.length }}条回复，<span style="color: lightskyblue">点击展开</span>
        </div>
      <!--   回复框     -->
        <div class="comment_input" v-if="reply">
          <el-avatar shape="circle" class="comment_avatar_root" :src="userInfo.avatar">登录</el-avatar>
          <div class="input_box">
            <el-input style="width: 100%;height: 100%" type="textarea" :placeholder="'回复'+replyName" :rows="3" maxlength="51" show-word-limit resize="none" :disabled="disabled" v-model="videoComment.comment"></el-input>
            <div class="input_nologin_cover" v-if="disabled">
              <span>请登录之后在评论吧  </span>
              <span @click="jump" class="login">登录</span>
            </div>
          </div>
          <el-button style="width: 75px;height: 70px;margin-left: 20px" :disabled="disabled" @click="submit">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CommentList",
  props:{
    comment:Object,
    owner:String,
    index:Number
  },
  data(){
    return{
      open:false,
      replyName: '',
      videoComment:{
          userName:'',
          userAvatar:'',
          toUserName:'',
          mtb:'',
          parentId:0,
          comment:'',
          owner:'0',
          thumbUpNum: 0,
          thumbDownNum: 0,
          likedStatus:''
      },
      userInfo:'',
      disabled:false,
      commentStatus:{
        mtb:'',
        userId:'',
        commentId:'',
        status:''
      }
    }
  },
  computed:{
    showChildren(){
      if (this.comment.children.length<=5){
        return this.comment.children
      }else{
        if (this.open){
          return this.comment.children
        }else{
          return this.comment.children.splice(0,5)
        }
      }
    },
    reply(){
      return this.index === this.$store.state.commentIndex
    }
  },
  methods:{
    replyClick(toUserName){
      this.$store.commit('setcommentIndex',this.index)
      this.replyName = toUserName
    },
    thumbUp(comment){
      if (!this.$store.state.userInfo){
        this.$router.push('/auth/login')
        return
      }
      if (!comment.likedStatus||comment.likedStatus === '0' || comment.likedStatus === '2'){
        comment.likedStatus = '1'
        this.commentStatus.status = '1'
        comment.thumbUpNum++
      }else{
        comment.likedStatus = '0'
        this.commentStatus.status = '0'
        comment.thumbUpNum--
      }

      this.commentStatus.commentId = comment.id
      this.commentStatus.mtb = comment.mtb
      this.$api.comment.thumbup(this.commentStatus).then(res=>{
        console.log(res)
      })
    },
    thumbDown(comment){
      if (!this.$store.state.userInfo){
        this.$router.push('/auth/login')
        return
      }
      if (!comment.likedStatus||comment.likedStatus === '0'|| comment.likedStatus === '1'){
        comment.likedStatus = '2'
        this.commentStatus.status = '2'
        comment.thumbDownNum++
      }else{
        comment.likedStatus = '0'
        this.commentStatus.status = '0'
        comment.thumbDownNum--
      }
      this.commentStatus.commentId = comment.id
      this.commentStatus.mtb = comment.mtb
      this.$api.comment.thumbup(this.commentStatus).then(res=>{
        console.log(res)
      })
    },
    submit(){
      this.videoComment.userName = this.userInfo.userName
      this.videoComment.toUserName = this.replyName
      this.videoComment.mtb =this.$route.query.mtb
      this.videoComment.userAvatar = this.userInfo.avatar
      this.videoComment.parentId = this.comment.id
      if (this.owner ===this.userInfo.userName){
        this.videoComment.owner = '1'
      }
      console.log(this.videoComment)
      this.$api.comment.submitComment(this.videoComment).then(res=>{
        if (res.code === 200){
          this.$parent.updateComment()
          this.videoComment.comment = ''
        }
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
    if (!this.$store.state.userInfo){
      this.disabled=true
    }
    if (this.$store.state.userInfo){
      this.userInfo = this.$store.state.userInfo
    }
    this.commentStatus.userId = this.userInfo.userId
  }
}
</script>

<style scoped>
.list_box{
  width: 100%;
  height: auto;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
}
.comment_root{
  width: 100%;
  display: flex;
}
.comment_root_content{
  width: 90%;
  margin-right: 90px;
}
.comment_root_content_name{
  font-size: 16px;
  color: deeppink;
}
.name_type{
  font-size: 12px;
  display: inline-block;
  width: 25px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  border: 1px solid black;
}
.content{
  font-size: 19px;
  font-weight: 300;
  margin: 3px 0;
}
.comment_data{
  margin-top: 2px;
  display: flex;
}
.comment_data span{
  color: gray;
  display: inline-block;
  font-size: 13px;
  margin-right: 30px;
}
.comment_answer{
  margin-top: 20px;
}
.comment_answer ul li{
  width: 100%;
  margin-bottom: 10px;
  display: flex;
}
.answer_content span{
  display: inline-block;
  margin-right: 10px;
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
.num{
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: gray;
  font-size: 12px;
}
.num span:hover{
  cursor: pointer;
}
.reply_class:hover{
  color: lightskyblue;
  cursor:pointer;
}

.icon_hover:hover{
  color: white;
  cursor: pointer;
}
.login:hover{
  cursor: pointer;
  color: yellow;
}

</style>