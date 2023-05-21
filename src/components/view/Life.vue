<template>
  <div class="life_box">
    <VideoPlayer></VideoPlayer>
  </div>
</template>

<script>
import VideoPlayer from "@/components/templates/VideoPlayer.vue";

export default {
  name: "Life",
  components: {VideoPlayer}
}
</script>

<style scoped>
.life_box{
  width: 80%;
  margin: 0 auto;
}
</style>