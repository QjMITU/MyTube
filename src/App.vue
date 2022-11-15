<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
import Index from './components/Index.vue'
export default {
  name: 'App',
  components: {
	Index
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
