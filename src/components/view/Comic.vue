<template>
  <div class="base_container">
    <div class="hot_play"><i class="iconfont icon-sousuo"></i>热播动漫</div>
    <VideoBox :record="1"></VideoBox>
  </div>
</template>

<script>
import VideoBox from "@/components/templates/VideoBox.vue";
import InfoEdit from "@/components/templates/InfoEdit.vue";
export default {
  components:{
    VideoBox,InfoEdit
  },
  name: "Comic",
  data(){
    return{

    }
  },
  methods:{

  },
  //加载数据
  created() {
    const param = 'comic'




  }
}
</script>

<style scoped>
.hot_play{
  width: 94rem;
  height: 3rem;
  font-size: 20px;
  line-height: 3rem;
  font-weight: 600;
  margin: 0 auto;
}
</style>