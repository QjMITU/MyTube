<!-- 首页页面 -->
<template>
	<div id="index">
		<div id="header">
			<ul>
				<li class="fl table_font margin_left">
					<router-link to="/index" active-class="active-class">首页</router-link>
				</li>
				<li class="fl table_font margin_left">
					<router-link to="/life" active-class="active-class">小视频</router-link>
				</li>
				<li class="fl table_font margin_left">
					<router-link to="/comic" active-class="active-class">动漫</router-link>
				</li>
				<li class="fr table_font margin_right">
					<router-link to="/user" active-class="active-class">个人中心</router-link>
				</li>
				<li class="fr table_font margin_left">
					<router-link to="/creation" active-class="active-class">创作中心</router-link>
				</li>
			</ul>
		</div>
		
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		data() {
			
		},
		
		
	}
</script>

<style>
	
	#index{
		width: 100%;
	}
	#header{
		width: 100%;
		height: 50px;
	}
	#header ul li{
		width: 80px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	#header ul li:hover{
		cursor: pointer;
		background-color: aliceblue;
	}
	.margin_left{
		margin-left: 10px;
	}
	
	.margin_right{
		margin-right: 20px;
	}
</style>