<template>
  <div @mouseenter="enter" @mouseleave="leave" class="info_content">
    <div class="info_label">{{ label }}</div>

    <div class="info_box">
      <div style="display: flex" v-if="!isEdit">
        <div class="info_data">{{ realValue }}</div>
        <div v-if="isEnter" @click="edit" class="change">修改</div>
      </div>

      <div class="edit_box" v-if="isEdit">
        <el-input class="text" v-if="kind === 'text'" type="text" v-model="editValue"></el-input>


        <el-input class="textarea" v-if="kind === 'textarea'" type="textarea" v-model="editValue" maxlength="30" show-word-limit resize="none" :rows="3"></el-input>
        <el-radio v-if="kind === 'radio'" v-model="editValue" label="1">男</el-radio>
        <el-radio v-if="kind === 'radio'" v-model="editValue" label="2">女</el-radio>

        <el-button round size="medium" @click="submit" class="btn1">确定</el-button>
        <el-button round size="medium" @click="cancel" class="btn2">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoEdit",
  props:{
    label:String,
    data:String,
    param:String,
    kind:{
      type:String,
      default:'text',
      validator(val){
        return ['text', 'textarea','radio'].includes(val);
      }
    },
    change:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      isEdit:false,
      isEnter:false,
      editValue:'',
      type: ''
    }
  },
  methods:{
    enter(index){
      if (this.change) {
        this.isEnter = true
      }
    },
    leave(){
      if (this.change) {
        this.isEnter = false
      }
    },
    edit(){
      this.isEdit = true
      this.editValue = this.data
    },
    submit(){
      console.log(this.editValue)
      if (this.editValue){
        this.isEdit =false
        this.$api.common.updateUserInfoProperty(this.param,this.editValue).then(res=>{
          if (res.code === 200) {
            this.$parent.flushData()
          }
        })
      }
    },
    cancel(){
      this.isEdit =false
    }
  },
  computed:{
    realValue(){
      if (this.param === 'sex'){
        if (this.data === '1'){
          this.editValue = '1'
          return '男'
        }
        if (this.data === '2'){
          this.editValue = '2'
          return '女'
        }
      }else{
        return this.data
      }
    }
  }
}
</script>

<style scoped>
.info_content{
  width: 100%;
  height: 80px;
  font-size: 15px;
  font-weight: lighter;
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px 0;
}
.change{
  color: blue;
  line-height: 80px;
}
.change:hover{
  color: lightskyblue;
  cursor: pointer;
}

.info_label{
  width: 10%;
  height: 80px;
  line-height: 80px;
}
.info_box{
  width: 90%;
  height: 100%;
}
.info_data{
  min-width: 100px;
  height: 80px;
  line-height: 80px;
}
.edit_box{
  width:90%;
  height: 80px;
  box-sizing: border-box;
  padding-top: 20px;
}
.text{
  width: 300px;
  height: 50px;
}
.textarea{
  width: 300px;
  height: 60px;
  margin-top: -20px;
}
.btn1{
  margin-left: 30px;
  background-color: #9a6e3a;
  border: 1px solid white;
}
.btn2{
  margin-left: 20px;
  border: 1px solid blueviolet;
}
</style>