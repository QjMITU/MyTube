<!-- 首页页面 -->
<template>
	<div id="index">
		<div id="header">
			<ul>
				<li class="fl table_font margin_left">首页</li>
				<li class="fl table_font margin_left">小视频</li>
				<li class="fr table_font margin_right">个人中心</li>
			</ul>
		</div>
		<div style="width: 70%; margin: 0 auto;">
			<Box></Box>
		</div>
		<span style="height: 50px;display: block;">视频列表</span>
		<VideoBox></VideoBox>
	</div>
</template>

<script>
	import Box from './templates/RunnerBox.vue'
	import VideoBox from './templates/VideoBox.vue'
	export default{
		data() {
			
		},
		components: {
			Box,VideoBox
		}
		
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