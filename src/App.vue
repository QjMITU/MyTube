<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
		text-decoration: none;
		list-style: none;
	}
	body{
		width: 100%;
	}
	#app{
		width: 100%;
    min-height: 100vh;
	}
</style>
