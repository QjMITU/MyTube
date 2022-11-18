<template>
	<div style="width: 100%">
		<!-- 视频预览框 -->
		<div>
			<video src="" autoplay></video>
		</div>
		<!-- 视频上传 -->
		<el-upload
		  class="upload-demo"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :on-preview="handlePreview"
		  :on-remove="handleRemove"
		  :before-remove="beforeRemove"
		  multiple
		  :limit="1"
		  :on-exceed="handleExceed"
		  :file-list="videoFileList">
		  <el-button size="small" type="primary">点击上传</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过700MB</div>
		</el-upload>
		<!-- 视频封面 -->
		<el-upload
		  class="upload-demo"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :on-preview="handlePreview"
		  :on-remove="handleRemove"
		  :before-remove="beforeRemove"
		  multiple
		  :limit="1"
		  :on-exceed="handleExceed"
		  :file-list="imageFileList">
		  <el-button size="small" type="primary">点击上传</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传jpg,png文件，且不超过10MB</div>
		</el-upload>
		<!-- 视频类型 -->
		<el-radio v-model="radio" label="1">短视频</el-radio>
		<el-radio v-model="radio" label="2">视频集</el-radio>
		<el-input v-model="input" placeholder="请输入作品标题"></el-input>
		<el-input v-model="input" placeholder="请输入作品描述"></el-input>
		
		
		<el-tag
		  :key="tag"
		  v-for="tag in dynamicTags"
		  closable
		  :disable-transitions="false"
		  @close="handleClose(tag)">
		  {{tag}}
		</el-tag>
		<el-input
		  class="input-new-tag"
		  v-if="inputVisible"
		  v-model="inputValue"
		  ref="saveTagInput"
		  size="small"
		  @keyup.enter.native="handleInputConfirm"
		  @blur="handleInputConfirm"
		>
		</el-input>
		<el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
		
		
		
		<div>
			<button>上传</button>
		</div>
		
	</div>
</template>

<script>
	export default{
		 data() {
		      return {
				videoFileList: [],
		        imageFileList: [],
				radio: '1'
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
	.el-tag + .el-tag {
	    margin-left: 10px;
	  }
	  .button-new-tag {
	    margin-left: 10px;
	    height: 32px;
	    line-height: 30px;
	    padding-top: 0;
	    padding-bottom: 0;
	  }
	  .input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
	  }
</style>