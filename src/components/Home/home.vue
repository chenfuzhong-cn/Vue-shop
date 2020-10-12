<template>
   <div>
       <router-link to="/login">login</router-link>
       <router-link to="/page1">page1</router-link>
       <router-link to="/page2">page2</router-link>
       <router-view/>
   </div>
</template>

<script>
export default {
    mounted() {
        window.localStorage.setItem('token','123456');
    }
}
</script>

<style>

</style>