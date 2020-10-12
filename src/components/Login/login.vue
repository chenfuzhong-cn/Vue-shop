<template>
  <div>
    <br>
    <el-button type="primary" @click="test">主要按钮</el-button>
  </div>
</template>

<script>
export default {
    data() {
      return {

      }
    },
    methods: {
      test() {
         this.$myHttp({
           url: `users`,
           method: 'get',
         }).then(back=>{
            console.log(back);
            console.log(window.localStorage.getItem('token'));
         });
      }
    },
    mounted() {
       
    },
    watch: {

    }
}
</script>

<style>

</style>