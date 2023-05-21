<template>
  <div class="base_container">
    <CommonHeader></CommonHeader>
    <div class="user_info">
      <div class="user">
        <div class="user_header">
          <el-avatar shape="square" :size="70" :src="user.avatar">user</el-avatar>
          <div class="user_name">
            <div class="name">{{ user.nickName }}</div>
            <div class="sign_content">{{ user.signContent }}</div>
          </div>
        </div>
      </div>
      <span class="info_title">基本信息</span>
      <div class="info">
        <InfoEdit kind="text" label="用户昵称" :data="user.nickName" param="nick_name"></InfoEdit>
        <InfoEdit kind="text" label="用户 ID" :change="false" :data="this.$store.state.userInfo.userName"></InfoEdit>
        <InfoEdit kind="text" label="联系方式" :data="user.phoneNumber" param="phone_number"></InfoEdit>
        <InfoEdit kind="text" label="邮箱地址" :data="user.email" param="email"></InfoEdit>
        <InfoEdit kind="radio" label="性别" :data="user.sex" param="sex"></InfoEdit>
        <InfoEdit kind="textarea" label="个人简介" :data="user.profile" param="profile"></InfoEdit>
      </div>
<!--      <span class="info_title">兴趣标签</span>
      <div class="user_label">
        <div class="label_content">
          <div class="label_title">感兴趣</div>
          <div>
            <Tag :tags="tags"></Tag>
          </div>
        </div>
        <div class="label_content">
          <div class="label_title">不感兴趣</div>
          <div></div>
        </div>
        <div>

        </div>
      </div>-->

    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/templates/CommonHeader.vue";
import Tag from "@/components/templates/Tag.vue";
import InfoEdit from "@/components/templates/InfoEdit.vue";
export default {
  components:{
    CommonHeader,Tag,InfoEdit
  },
  name: "UserCenter",
  data(){
    return{
      user:'',
      index: 0,
      editIndex:0,
      isEdit: false,
      editValue:'',
      tags:['1','2']
    }
  },
  methods:{
    flushData(){
      this.$api.common.getUserInfo().then(res=>{
        this.user = res.data
      })
    }
  },
  created() {
    this.$api.common.getUserInfo().then(res=>{
      this.user = res.data
    })
  }
}
</script>

<style scoped>
.user_info{
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
}
.user{
  width: 100%;
  height: 150px;
  padding:65px 20px 10px;
  position: relative;
  background-color: white;
}
.user_header{
  position: absolute;
  left: 20px;
  bottom: 10px;
  display: flex;
  flex-direction: row;
}
.user_name{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.name{
  font-size: 20px;
  color: black;
  font-weight: bold;
  height: 30px;
  margin-bottom: 14px;
}
.sign_content{
  font-size: 16px;
  color: rgb(209, 207, 200);
  height: 25px;
}
.info{
  width: 100%;
  padding:20px 20px 10px;
  background-color: white;
}
.info_title{
  margin-top: 10px;
  background-color: white;
  padding: 0 20px;
  display: block;
  font-size: 17px;
  font-weight: bold;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f0f0f0;
}
.user_label{
  width: 100%;
  padding:20px 20px 10px;
  background-color: white;
  font-size: small;
  font-weight: lighter;
}
.label_content{
  display: flex;
  flex-direction: row;
}
.label_title{
  width: 70px;
  margin-right: 10px;
  margin-left: 10px;
  height: 40px;
}
</style>