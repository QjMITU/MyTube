<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in imgs" :key="item">
      <img :src="item"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data(){
    return{
      imgs:[
        require('../../../public/static/hutao1.jpg'),
        require('../../../public/static/hutao2.jpg'),
        require('../../../public/static/hutao3.jpg'),
      ]
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
	text-align: center;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
	text-align: center;
  }
</style>
