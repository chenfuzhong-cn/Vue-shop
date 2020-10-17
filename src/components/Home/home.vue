<template>
   <div>
     <el-button type="primary" @click="layout">退出</el-button>
   </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
       layout() {
           window.localStorage.setItem('token','');
           this.$message({type:'success',message:'您已退出登录'});
           this.$router.push({path:'/login'});
       }
    },
}
</script>

<style scoped>

</style>