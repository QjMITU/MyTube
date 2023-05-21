<template>
  <div class="login_box">
    <div class="form_title_box">登录</div>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="80px" class="form_style">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-row>
          <el-col :span="7">
            <el-input type="text" v-model="loginForm.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="9">
            <div class="code_box fl" @click="flushCode">
              <img :src="codeImg" alt="验证码">
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data(){

    var validatorCount=(rule,value,callback) =>{
      var countReg =new RegExp('[\\w@.]{5,20}')
      if (value ===''){
        callback(new Error('账号不能为空'))
      }else{
        if (!countReg.test(value)) {
          callback(new Error('账号由a-zA-Z0-9@.组成，长度5~20'))
        }else{
          callback()
        }
      }
    }

    var validatorPass=(rule, value, callback) => {
      var passReg = new RegExp('[\\w_@#$!~.]{5,20}')
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (!passReg.test(value)){
          callback(new Error('密码由a-zA-Z0-9_@#$!~.组成，长度5~20'));
        } else if (this.loginForm.checkPass !== '') {
          this.$refs.loginForm.validateField('checkPass');
        }
        callback();
      }
    }
    var validatorCode = (rule, value, callback) => {
      var codeReg = new RegExp('[\\w]{1,10}')
      if (value === '') {
        callback(new Error('验证码不能为空'));
      }else if (!codeReg.test(value)){
        callback(new Error('验证码非法'));
      } else {
        callback();
      }
    }
    return{
      loginForm: {
        username:'',
        password:'',
        // checkPass:'',
        code:'',
        uuid:''
      },
      rules:{
        username:{validator:validatorCount,trigger: 'blur'},
        password:{validator:validatorPass,trigger: 'blur'},
        code:{validator:validatorCode,trigger: 'blur'}
      },
      codeImg:'',
      uuid: '',
    };
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login(){
      this.loginForm.uuid = this.uuid
      this.$api.common.login(this.loginForm).then(res=>{
        if (res.code===200){
          //登录用户信息存储在缓存中，刷新页面不会丢失
          localStorage.setItem('userInfo',JSON.stringify(res.data))
          this.$store.commit('setToken',res.data.token)
          this.$store.commit('setUserInfo',res.data)

          //登录成功之后，重新跳转到原页面
          const redirect = this.$route.query.redirect
          if (redirect){
            this.$router.push(redirect)
          }else{
            this.$router.push('/index/first')
          }

        }else{
          //提示失败原因
          //登录失败，刷新验证码
          this.flushCode()
          this.loginForm.code = ''
          this.$message({
            type:"error",
            message:res.msg
          })
        }
      })
    },
    //刷新验证码
    flushCode(){
      this.$api.common.getCode().then(res=>{
        this.codeImg = ' data:image/png;base64,'+res.data.img
        this.uuid = res.data.uuid
      })
    }
  },
  created() {
    if (this.$route.params.userName) {
      this.loginForm.username = this.$route.query.userName
    }
    this.$api.common.getCode().then(res=>{
      this.codeImg = ' data:image/png;base64,'+res.data.img
      this.uuid = res.data.uuid
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
  .login_box{
    width: 30%;
    margin-top: 130px;
    margin-right: 35%;
    margin-left: 35%;
    border: 1px solid #475669;
    background: #f3b666;
  }
  .form_style{
    width: 90%;
    margin: 0 auto;
  }
  .code_box{
    width: 80px;
    height: 35px;
    margin-left: 5px;
    margin-top: 2px;
    border: 1px solid white;
    cursor: pointer;
  }
</style>
