<template>
  <ul class="tags">
    <li v-for="item in tags" class="tag_box">
      <span>{{item}}</span>
      <i class="cancel_icon">x</i>
    </li>
    <li class="addbtn">+</li>
  </ul>

</template>

<script>
export default {
  name: "Tab",
  props:{
    tags: Array
  }
}
</script>

<style scoped>
.tags{
  display: flex;
  flex-direction: row;
}
.tag_box{
  height: 28px;
  line-height: 28px;
  background-color: lightskyblue;
  margin-left: 10px;
  min-width: 40px;
  padding-left: 8px;
  display: flex;
}
.cancel_icon{
  display: inline-block;
  width: 10px;
  height: 10px;
}
.cancel_icon:hover{
  cursor: pointer;
  background-color: gold;
}
.addbtn{
  width: 28px;
  height: 28px;
  background-color: gold;
  margin-left: 10px;
}
</style>