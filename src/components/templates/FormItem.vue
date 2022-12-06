<template>
  <div>
    <label>{{label}}</label>
    <input v-bind:type=type placeholder="" />
  </div>
</template>

<script>
export default {
  name: "FormItem",
  props:{
    label: {
      type:String,
      default:''
    },
    type: {
      type:String,
      default:''
    },
    data(){
      return{
        type: '',
        label: ''
      }
    }
  }
}
</script>

<style scoped>

</style>