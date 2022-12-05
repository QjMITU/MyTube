<template>
	<div style="width: 100%">
	
		<div class="videobox">
			<div style="width: 100%;">
				
				<div class="showvideo">
					123
				</div>
				
				<div class="showcarver">
					图片
				</div>
			</div>

      <div class="upload_files">
        <div>
          媒体资源上传：
        </div>

        <el-upload
            class="fl upload_margin"
            drag
            action=""
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过200MB</div>
        </el-upload>

        <el-upload
            class="fr upload_margin"
            drag
            action=""
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>

      <div class="upload_info">

        <div>
          作品信息
        </div>
      </div>



		</div>
		
		
		<div class="submit">
			<button>提交作品</button>
		</div>

		
	</div>
</template>

<script>
	export default{
		 data() {
        return {

        };
     },
		methods: {

		  
		}
	}
</script>

<style>
	.videobox{
		width: 90%;
    margin: 0 auto;
	}
	.showvideo{
		width: 100%;
		height: 300px;
		background-color: gray;
	}
	.showcarver{
		width: 100%;
		height: 90px;
		margin-top: 10px;
		background-color: aqua;
	}
  .upload_files{
    width: 100%;
    margin-top: 20px;
    border-bottom: 1px solid gray;
    overflow: hidden;
    padding-bottom: 30px;
  }
  .upload_margin{
    margin: 0 20px 0 20px;
  }
	.submit{
		width: 100px;
		margin: 0 auto;
	}
</style>