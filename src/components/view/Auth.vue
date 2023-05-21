<template>
  <div class="login_body">
    <nav>
      <a href="/index" class="fl logo_btn">logo</a>
      <div class="fr nav_btn">
        <router-link to="/auth/login" active-class="active-class" class="nav_font">登录</router-link>
      </div>
      <div class="fr nav_btn">
        <router-link to="/auth/register" active-class="active-class" class="nav_font">注册</router-link>
      </div>
    </nav>
    <router-view></router-view>
    <div class="number_box" v-show="$route.meta.show">
      <div class="logo_box">
        <span>做一个热爱动漫的人！！！</span>
      </div>
      <div class="action_box">
        <a href="/auth/login" class="btn fr">登录</a>
        <a href="/auth/register" class="btn fr btn_register">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",

  methods:{

  }
}
</script>

<style scoped>
  .login_body{
    width: 100%;
    height: 100vh;
    background-image: url("https://static.sockboom.click/12_24.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .login_body nav{
    padding-top: 20px;
    height: 40px;
    width: 100%;
  }
  .logo_btn{
    height: 100%;
    width: 80px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin: 0 10px;
  }
  .nav_btn{
    height: 100%;
    width: 80px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin: 0 10px;
  }
  .nav_btn:hover{
    background-color: rgba(155, 152, 152, 0.2);
  }

  .number_box{
    width: 35%;
    height: 200px;
    margin-top: 17%;
    margin-left: 15%;
  }
  .logo_box{
    width: 100%;
    height: 75%;
    color: white;
  }
  .action_box{
    width: 100%;
    height: 25%;
    position: relative;
  }

  .btn{
    display: block;
    width: 100px;
    height:40px;
    line-height: 40px;
    text-align: center;
    box-shadow: 0 2px 10px 0 rgb(0 0 0 / 16%);
    transition: .2s ease-in-out;
    margin: 2px 10px 0 0;
    border:2px solid white ;
    font-size: small;
    color: white;
    border-radius: 2px;
  }
  .btn:hover{
    box-shadow: 0 2px 15px 0 rgb(0 0 0 / 30%);
  }
  .btn_register{
    background-color: white;
    color: black;
  }

</style>