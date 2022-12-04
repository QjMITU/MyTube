<template>
	<div style="width: 100%">
	
		<div class="videobox">
			<div class="fl" style="width: 60%;">
				
				<div class="showvideo">
					123
				</div>
				
				<div class="showcarver">
					图片
				</div>
				
				
			</div>
			<div class="fl" style="width: 40%;">
				<div class="uploadbox">
					<el-upload
					  class="fl"
					  action=""
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  multiple
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="videoFileList">
					  <el-button size="small" type="primary">上传视频</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过700MB</div>
					</el-upload>
					
					
					<el-upload
					  class="fr margin-right60"
					  action=""
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  multiple
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="videoFileList">
					  <el-button size="small" type="primary">上传封面</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg、png文件，且不超过20MB</div>
					</el-upload>
				</div>
				
				
				<div style="width: 95%;margin: 0 auto;">
					<el-form ref="form" :model="form" label-width="80px" label-position="right">
						<el-form-item label="作品标题">
							<el-input></el-input>
						</el-form-item>
						
						
						
					</el-form>
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
				videoFileList: [],
		        imageFileList: [],
				form: {
					
				}
		      };
		    },
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			}
		  
		}
	}
</script>

<style>
	.videobox{
		width: 100%;
	}
	.showvideo{
		width: 90%;
		height: 300px;
		margin: 0 auto;
		background-color: black;
	}
	.showcarver{
		width: 90%;
		height: 90px;
		margin: 0 auto;
		margin-top: 10px;
		background-color: aqua;
	}

	.uploadbox{
		width: 100%;
		height: 70px;
		margin-bottom: 10px;
		border-bottom: 1px solid #ffff44;
	}


	.margin-right60{
		margin-right: 60px;
	}
	
	.submit{
		width: 100px;
		margin: 0 auto;
		
	}
</style>