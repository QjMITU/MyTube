<template>
	<div>
		<div style="width: 90%; margin: 0 auto;">
			<Box></Box>
		</div>
		<span style="height: 50px;display: block;">视频列表</span>
		<VideoBox></VideoBox>
	</div>
	
</template>

<script>
	import Box from '../templates/RunnerBox.vue'
	import VideoBox from '../templates/VideoBox.vue'
	export default{
		
		components: {
			Box,VideoBox
		}
		
		
		
	}
	
	
</script>

<style>
</style>