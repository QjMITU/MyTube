<template>
  <div id="app">
    <Index></Index>
	<router-view></router-view>
	<Floor></Floor>
  </div>
</template>

<script>
import Index from './components/Index.vue'
import Floor from './components/Floor.vue'
export default {
  name: 'App',
  components: {
	Index,Floor
  }
}
</script>

<style>
	*{
		margin: 0 auto;
		padding: 0 auto;
		text-decoration: none;
		list-style: none;
	}
	body{
		width: 100%;
	}
	#app{
		width: 100%;
	}
</style>
