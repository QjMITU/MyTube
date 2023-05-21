<template>
  <div class="reg_box">
    <div class="form_title_box">注册</div>
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="80px" class="form_style">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
<!--      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="registerForm.email" autocomplete="off"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    var validatorCount=(rule,value,callback) =>{
      var countReg =new RegExp('[\\w@.]{10,20}')
      if (value ===''){
        callback(new Error('账号不能为空'))
      }else{
        if (!countReg.test(value)) {
          callback(new Error('账号由a-zA-Z0-9@.组成，长度10~20'))
        }else{
          callback()
        }
      }
    }

    var validatorPass=(rule, value, callback) => {
      var passReg = new RegExp('[\\w_@#$!~.]{8,20}')
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (!passReg.test(value)){
          callback(new Error('密码由a-zA-Z0-9_@#$!~.组成，长度8~20'));
        } else if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    }

    var validatorCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
   /* var validatorEmail = (rule, value, callback) => {
      var emailReg = new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!emailReg.test(value)){
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    }*/
    return{
      registerForm:{
        username:'',
        password:'',
        checkPass:''
        // email:''
      },
      rules:{
        username:{validator:validatorCount,trigger: 'blur'},
        password:{validator:validatorPass,trigger: 'blur'},
        checkPass:{validator:validatorCheckPass,trigger: 'blur'},
        // email:{validator:validatorEmail,trigger: 'blur'}
      }
    };
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register(){
      this.$api.common.register(this.registerForm).then(res=>{
        if (res.code === 200){
          this.$message({
            type:"success",
            message:"注册成功！"
          })
          this.$router.push('/auth/login')
        }
      })
    }
  }
}
</script>

<style scoped>
  .reg_box{
    width: 30%;
    margin-top: 130px;
    margin-right: 35%;
    margin-left: 35%;
    border: 1px solid #475669;
    background: rgb(192, 133, 133);
  }
  .form_style{
    width: 90%;
    margin: 0 auto;
  }
</style>