<template>
	<div id="video">
		<ul v-for="item in 2" :key="item">
			<li v-for="li in 5" :key="li">
			
					<div class="imagev">
						{{ li }}
					</div>
					<div class="titlev">
						这是这视频的标题
					</div>
			</li>
		</ul>
	</div>
	
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	#video{
		width: 100%;
	}
	#video ul{
		background-color: aliceblue;
		width: 90%;
		height: 220px;
		margin: 0 auto;
		margin-bottom: 10px;
		padding-top: 5px;
		overflow: hidden;
		padding: 0;
		display: flex;
		flex-direction: row;
	}
	#video ul li{
		width: 19%;
		height: 220px;
		border: 1px solid white;
		text-align: center;
	}
	.imagev{
		width: 100%;
		height: 180px;
		line-height: 180px;
	}
	.titlev{
		width: 100%;
		height: 40px;
		padding-left: 2px;
	}
</style>