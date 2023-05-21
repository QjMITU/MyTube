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
          <div v-for="(img,index) in images" class="cover" :class="{cover_chose:index===coverIndex}" @click="choseCover(index)">
            <el-image
                style="width: 100%; height: 100%"
                :src="img">
            </el-image>
          </div>
				</div>
			</div>

      <div class="label_name">
        媒体资源上传
      </div>
      <div class="upload_files">
        <el-col :span="12">
          <el-upload
              class="fl upload_margin"
              drag
              :limit="1"
              accept=".mp4,.flv"
              action="#"
              :http-request="uploadFile"
              :on-success="uploadVideoSuccess"
              :on-error="uploadError">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过200MB</div>
          </el-upload>
        </el-col>
        <el-col :span="12">
          <el-upload
              class="fr upload_margin"
              drag
              :limit="1"
              action="#"
              :http-request="uploadFile"
              :on-success="uploadImageSuccess"
              :on-error="uploadError"
              accept=".jpg,.png">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将封面文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-col>

      </div>

      <div class="upload_info">
        <div class="label_name">
          作品信息
        </div>

        <el-form ref="videoForm" :model="videoForm" label-width="100px" label-position="left">


          <el-row>
            <el-col :span="10">
              <el-form-item label="类型">
                <el-radio-group v-model="videoForm.type">
                  <el-radio label="1">原创</el-radio>
                  <el-radio label="2">转载</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="是否加入合集">
                <el-radio-group v-model="videoForm.collection" @input="change">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-if="videoForm.collection===1">
              <el-form-item label="所属合集">
                <el-select v-model="videoForm.collectionId" placeholder="请选择" style="margin-right:10px">
                  <el-option v-for="item in collectionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-button type="text" @click="addTable = true">创建合集</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="标题">
                <el-input v-model="videoForm.videoTitle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="作品描述">
                <el-input v-model="videoForm.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="标签">
            <el-tag
                :key="tag"
                v-for="tag in records"
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
      <el-dialog title="创建合集" :visible.sync="addTable">
        <el-form ref="collectionForm" :model="collectionForm" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="合集名称">
                <el-input v-model="collectionForm.name"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="合集描述">
                <el-input type="textarea" v-model="collectionForm.description"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="合集封面">
                <el-upload class="upload-demo"
                           action="#"
                           :limit="1"
                           :http-request="uploadFile"
                           :on-success="collectionCoverUploadSuccess"
                           :file-list="collectionCaver">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addTable = false">取 消</el-button>
          <el-button type="primary" @click="submitTable">提 交</el-button>
        </div>
      </el-dialog>

		</div>

		<div class="submit" @click="submit">
			立即提交
		</div>


	</div>
</template>

<script>
  export default{
		 data() {
       return {
         addTable: false,
         videoForm:{
           type: '',
           collection: 2,
           collectionId:'',
           videoTitle: '',
           description: '',
           records: '',
           viewNum: 0,
           url: '',
           videoImageUrl: ''
         },
         collectionForm:{
           userId:'',
           name:'',
           description:'',
           cover:'',
           videoNum:0
         },
         collectionCaver:[],
         inputVisible: false,
         inputValue: '',
         records: [],
         images: [],
         videoUrl: '',
         coverIndex: 0,
         collectionList:[]
        };
     },
		methods: {
      handleClose(tag) {
        this.records.splice(this.records.indexOf(tag), 1);
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
          this.records.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      uploadVideoSuccess(res){
        if (res.code==200){
          this.videoUrl ='/profile'+res.data
          this.videoForm.url = res.data
          this.getPreviewCover(res.data)
        }

      },
      getPreviewCover(url){
        this.$api.video.previewCoverUrl(url).then(res=>{
          if (res.code === 200) {
            let urls = res.data.map(item=>{
              return '/profile'+item
            })
            this.images = this.images.concat(urls)
          }
        })
      },
      uploadImageSuccess(res){
        this.images.push('/profile'+res.data)
        this.coverIndex = this.images.length-1
      },
      uploadError(res){
        console.log(res.status)
      },
      //选择封面
      choseCover(index){
        this.coverIndex = index
      },
      submit() {
        this.videoForm.videoImageUrl = this.images[this.coverIndex]
        this.videoForm.records = this.records.join(',')
        if (this.videoForm.collection==2){
          this.videoForm.collectionId=0;
        }
        this.$api.video.submitVideoForm(this.videoForm).then(res=>{
          if (res.code === 200) {
            this.$notify({
              type:'success',
              message:'作品上传成功，等待审核',
              title:'上传成功'
            })
          }else{
            this.$notify({
              type:'error',
              message:'作品上传失败',
              title:'上传失败'
            })
          }
        })
      },
      //新建合集接口
      submitTable(){
        this.addTable =false
        this.collectionForm.userId =this.$store.state.userInfo.userId
        this.$api.video.createVideoCollection(this.collectionForm).then(res=>{
          this.collectionList.push(res.data)
        })
      },
      change(){
        if (this.videoForm.collection ===1){
          const param = {
            userId: this.$store.state.userInfo.userId
          }
          this.$api.video.getVideoCollectionList(param).then(res=>{
            this.collectionList=res.data
          })
        }
      },
      collectionCoverUploadSuccess(res){
        console.log(res.data)
        this.collectionForm.cover ='/profile'+res.data
      },
      //视频和图片上传接口
      uploadFile(param){
        console.log(param.file)
        const file = param.file
        const formData = new FormData();
        formData.set("file",file)
        this.$api.common.upload(formData).then(res=>{
          param.onSuccess(res)
        })
      }
		}
	}
</script>

<style>
	.videobox{
		width: 90%;
    margin: 0 auto;
    color: black;
	}
	.showvideo{
		width: 100%;
		height: 350px;
		background-color: gray;
	}
	.showcarver{
		width: 100%;
		height: 80px;
		margin-top: 10px;
    padding: 10px 0;
    overflow: hidden;
    border: 2px dashed #e0dada
	}
  .cover{
    width: 120px;
    height: 70px;
    padding: 5px;
    margin: 0 5px;
    float: left;
  }
  .cover_chose{
    width: 120px;
    height:70px;
    border: 5px solid indianred;
    margin: 0 5px;
    padding:0;
    float: left;
  }
  .cover:hover{
    cursor: pointer;
    border:5px solid red;
    width: 120px;
    height:70px;
    padding: 0;
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
