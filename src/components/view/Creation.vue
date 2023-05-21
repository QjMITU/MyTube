<template>
	<div class="base_container">
    <div class="create_header">
      <ul class="header_menu">
        <li class="fl mytube_icon">Mytube创作中心</li>
        <li class="fl index_view" @click="redirectToIndex">网站主页</li>
        <li class="fr user_center" @click="redirectToUserCenter">
          <el-avatar :src="user.avatar">登录</el-avatar>
        </li>
      </ul>
    </div>
    <div style="width: 100%;height: 100%">
      <el-menu mode="vertical"
               class="menu"
               router
               :default-active="defaultIndex"
               @select="selectMenu"
      >
        <div class="upload">
          <div class="upload_box" @click="jumpTo">
            <i></i>投稿
          </div>
        </div>
        <el-menu-item index="/creation/index">
          <i></i>首页
        </el-menu-item>
<!--        <el-menu-item index="/creation/data">
          <i></i>数据中心
        </el-menu-item>-->
        <el-menu-item index="/creation/video">
          <i></i>内容管理
        </el-menu-item>
      </el-menu>
      <div class="create_content">
        <router-view></router-view>
      </div>
    </div>
	</div>
</template>

<script>

	export default{
    data(){
      return{
        defaultIndex:'/creation/index',
        user:''
      }
    },
    methods:{
      jumpTo(){
        this.defaultIndex = ''
        this.$router.push('/creation/upload')
      },
      selectMenu(index){
        this.defaultIndex = index
      },
      redirectToUserCenter(){
        if (this.$router.currentRoute.fullPath != '/ucenter') {
          this.$router.push('/ucenter')
        }
      },
      redirectToIndex(){
        this.$router.push('/index/first')
      }
    },
    created() {
      this.defaultIndex = this.$router.currentRoute.fullPath
      if (this.$store.state.userInfo){
        this.user = this.$store.state.userInfo
      }
    }
  }
</script>

<style scoped>
.create_header{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f2f2f2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: white;
}
.header_menu{
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding-left: 20px;
  padding-right: 50px;
}
.mytube_icon{
  width: 150px;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.index_view{
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin-left: 20px;
}
.index_view:hover{
  cursor: pointer;
}
.user_center{
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  padding-top: 10px;
}
.user_center:hover{
  cursor: pointer;
}
.menu{
  width: 200px;
  min-height: 100vh;
  padding-top: 60px;
  box-sizing: border-box;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
}
.upload{
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  padding: 10px 0;
}
.upload_box{
  width: 70%;
  height: 50px;
  margin: 0 auto;
  background-color: lightskyblue;
  line-height: 50px;
  text-align: center;
}
.upload_box:hover {
  cursor: pointer;
}
.create_content{
  width: 100%;
  min-height: 100vh;
  padding-top: 60px;
  background-color: #f2f2f2;
  padding-left: 200px;
  padding-bottom: 60px;
  box-sizing: border-box;
}

</style>
