<template>
	<div style="min-height: 90vh">
		<div style="width: 90%; margin: 0 auto;height: 30%">
			<Box></Box>
		</div>
		<div class="video_title">视频列表</div>
		<VideoBox></VideoBox>
	</div>
</template>

<script>
	import Box from '../templates/RunnerBox.vue'
	import VideoBox from '../templates/VideoBox.vue'
	export default{
		components: {
			Box,VideoBox
		},
    data(){
      return{

      }
    },
    methods:{

    },
    created() {

    }
  }


</script>

<style scoped>
.video_title{
  font-weight: bold;
  font-family: "宋体";
  font-size: 20px;
  margin-left: 40px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}
</style>
