<!-- 首页页面 -->
<template>
		<div id="content">
			<ul>
				<li class="fl margin_left10">
					<router-link to="/index/first" active-class="active_class">首页</router-link>
				</li>
<!--				<li class="fl margin_left10">-->
<!--					<router-link to="/index/life" active-class="active_class">小视频</router-link>-->
<!--				</li>-->
				<li class="fl margin_left10">
					<router-link to="/index/comic" active-class="active_class">动漫</router-link>
				</li>
				<li class="fr margin_right20">
					<router-link to="/ucenter">个人中心</router-link>
				</li>
				<li class="fr margin_left10">
					<router-link to="/creation">创作中心</router-link>
        </li>
        <li class="fr margin_left10" v-if="this.$store.state.userInfo!=null && this.$store.state.userInfo.isRoot">
          <router-link to="/exam">审核中心</router-link>
        </li>
        <div class="search">
          <input type="search" placeholder="搜索" v-model="searchValue"/>
          <div class="search_btn" @click="search"><i class="iconfont icon-sousuo"></i></div>
        </div>
			</ul>
      <router-view></router-view>
      <Floor></Floor>
		</div>
</template>

<script>
	import Floor from "@/components/Floor.vue";

  export default{
    components: {
      Floor
    },
		data(){
      return{
        searchValue:'',
      }
    },
    methods:{
      search(){
        if (this.searchValue !== ''){
          this.$api.video.search(this.searchValue).then(res=>{
            if (res.code === 200) {
              this.$store.commit('setSearch',res.data)
              if (this.$route.fullPath !== '/index/search')
                this.$router.push('/index/search')
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    }


	}
</script>

<style scoped>
	#content{
		width: 100%;
    min-height: 100vh;
	}
  #content ul{
    padding-top: 15px;
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    background-color: #f3b666;
  }
	#content ul li{
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
    font-size: 15px;
    font-weight: normal;
    font-family: '宋体';
	}
	#content ul li a:hover{
		cursor: pointer;
    color: lightskyblue;
	}
  .search{
    width: 500px;
    border-radius: 10px;
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
    background-color: white;
    border-style: hidden;
    outline: none;
  }
  .search_btn{
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .search_btn:hover{
    cursor: pointer;
    color: #475669;
  }

</style>
