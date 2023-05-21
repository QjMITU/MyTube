<template>
  <div class="create_header">
    <ul class="header_menu">
      <li class="fl mytube_icon" @click="redirectToIndex">Mytube</li>
      <li class="fr user_center" @click="redirectToUserCenter">
        <el-avatar :src="user.avatar">登录</el-avatar>
      </li>
      <div class="search">
        <input type="search" placeholder="搜索" v-model="searchValue"/>
        <div class="search_btn" @click="search"><i class="iconfont icon-sousuo"></i></div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  data(){
    return{
      searchValue:'',
      user: ''
    }
  },
  methods:{
    redirectToIndex(){
      this.$router.push('/index/first')
    },
    redirectToUserCenter(){
      if (this.$router.currentRoute.fullPath != '/ucenter') {
        this.$router.push('/ucenter')
      }
    },
    search(){
      console.log(1)
      if (this.searchValue !== ''){
        this.$api.video.search(this.searchValue).then(res=>{
          if (res.code === 200) {
            this.$store.commit('setSearch',res.data)
            this.$router.push('/index/search')
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  },
  created() {
    if (this.$store.state.userInfo){
      this.user = this.$store.state.userInfo
    }
  }
}
</script>

<style scoped>
.create_header{
  padding-top: 5px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f2f2f2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: #f3b666;
}
.header_menu{
  width: 100%;
  height: 60px;
}
.mytube_icon{
  width: 150px;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.mytube_icon:hover{
  cursor: pointer;
}
.user_center{
  margin-top: 10px;
  margin-right: 20px;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.user_center:hover{
  cursor: pointer;
}
.search{
  width: 500px;
  padding: 5px 10px 5px 10px;
  background-color: white;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
}
.search input{
  width: 460px;
  height: 40px;
  padding-left: 5px;
  background-color: #f2f2f2;
  border-style: hidden;
  outline: none;
  border-radius: 10px;
}
.search_btn{
  text-align: center;
  line-height: 40px;
  width: 40px;
  height: 40px;
}
.search_btn:hover{
  cursor: pointer;
  color: white;
}
</style>
