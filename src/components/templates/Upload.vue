<template>
	<div style="width: 100%">
	
		<div class="videobox">
			<div style="width: 100%;">
				<div>视频预览</div>
				<div class="showvideo">
					<video :src="videoUrl" autoplay controls width="100%" height="100%"></video>
				</div>
				<div>封面预览</div>
				<div class="showcarver">
					图片
				</div>
			</div>

      <div class="upload_files">
        <div class="label_name">
          媒体资源上传
        </div>
        <el-upload
            class="fl upload_margin"
            drag
            :action="uploadUrl"
            :on-success="uploadVideoSuccess"
            :headers="headers"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过200MB</div>
        </el-upload>
        <el-upload
            class="fr upload_margin"
            drag
            :action="uploadUrl"
            :on-success="uploadImageSuccess"
            :headers="headers"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将封面文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>

      <div class="upload_info">
        <div class="label_name">
          作品信息
        </div>

        <el-form ref="videoform" :model="videoform" label-width="80px">


          <el-row>
            <el-col :span="10">
              <el-form-item label="类型">
                <el-radio-group v-model="videoform.type">
                  <el-radio label="原创"></el-radio>
                  <el-radio label="转载"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="10">
              <el-form-item label="标题">
                <el-input v-model="videoform.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="作品描述">
                <el-input v-model="videoform.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-form-item label="标签">
            <el-tag
                :key="tag"
                v-for="tag in videoform.records"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
                class="input-new-tag tags_width"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
          </el-form-item>


        </el-form>

      </div>


		</div>
		
		
		<div class="submit">
			立即提交
		</div>

		
	</div>
</template>

<script>

	export default{
		 data() {
       let token = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl9rZXkiOiIyZjVhNzAxMGJkMDA0OWFjYTQ0OWQzYzI2NTJkYjNhOCJ9.im3WBGlgmW9_0sSjzP9qy73TFkgJv3tqYSvshoz9WMj95p4jG79gJS7P0EIwVeEMGP0hHqXwNvrYgk-VzqRWEg'
       return {
          videoform:{
            type: '',
            title: '',
            description: '',
            records: []
          },
          inputVisible: false,
          inputValue: '',
          uploadUrl: 'http://localhost:8081/common/upload',
          headers:{
            'Authorization' : 'Bearer ' + token
          },
          images: [],
          videoUrl: ''
        };
     },
		methods: {
      handleClose(tag) {
        this.videoform.records.splice(this.videoform.records.indexOf(tag), 1);
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
          this.videoform.records.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      uploadVideoSuccess(res){
        console.log("上传成功")
        console.log(res.data)
        this.videoUrl = 'http://localhost:8081/profile'+res.data;
      },


      uploadImageSuccess(res){
        console.log("上传成功")
        console.log(res.data)



      },


      submit() {




      }
		  
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
		height: 350px;
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
    margin: 0 90px 0 90px;
  }
	.submit{
		width: 120px;
    height: 35px;
		margin: 20px auto;
    text-align: center;
    line-height: 35px;
    background-color: deepskyblue;
    border-radius: 2px;
	}
  .submit:hover{
    cursor: pointer;
    background-color: gray;
  }
  .label_name{
    margin: 20px 0;
    font-family: "宋体";
    font-size: 25px;
    font-weight: bold;
  }
  .tags_width{
    width: 80px;
  }
</style>