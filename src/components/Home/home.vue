<template>
    <el-container>
        <!-- 头部 -->
        <el-header>
            <div class="logo">
                <img src="../../assets/images/logo.png" alt="logo" width="50">
                <span><span class="A">A</span>sino电商后台管理系统</span>
            </div>
            <el-button type="danger" @click="layout" class="logout">退出</el-button>
        </el-header>
        <!-- 主体 -->
        <el-container>
            <!-- 左边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
               <!-- 导航菜单栏 -->
               <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="rgb(49,55,67)"
                text-color="#fff"
                active-text-color="red"
                router
                :collapse="isCollapse"
                :unique-opened="true"
                :collapse-transition="false"
                @open="handleOpen"
                @close="handleClose">
                <!-- nav1 -->
                <el-submenu :index="item.path" v-for="item in menus" :key="item.id">
                    <template slot="title">
                    <!-- 对象可以用数组方式调用 -->
                    <i :class="iconsObj[item.id]"></i>
                    <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
                        <i class="el-icon-menu"></i>{{item2.authName}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                </el-menu>
            </el-aside>
            <!-- 右边栏 -->
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
          menus: [],
          iconsObj: {
              '125': 'iconfont icon-users',
              '103': 'iconfont icon-tijikongjian',
              '101': 'iconfont icon-shangpin',
              '102': 'iconfont icon-danju',
              '145': 'iconfont icon-baobiao'
          },
          isCollapse: true,
        }
    },
    methods: {
    layout() {
           window.localStorage.setItem('token','');
           this.$message({type:'success',message:'您已退出登录'});
           this.$router.push({path:'/login'});
       },
    handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
    navMenu() {
         this.$myHttp({
             url:'menus',
             method:'get'
         }).then(back => {
             let {data,meta} = back.data
            if (meta.status !== 200) return this.$message.error('获取菜单列表失败');
            this.menus = data 
         })
       },

    /* 点击按钮折叠展开 */
    toggleCollapse() {
         this.isCollapse = !this.isCollapse;

       }
    },
    mounted() {
      this.navMenu()
    }
}
</script>

<style scoped>
    /* header */
  .el-header{
        background-color:rgb(51,61,64);
        color: #fff;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
  }
  .logo {
      display: flex;
      align-items: center;
  }
  .logo .A {
      font-size: 25px;
      color: rgb(43, 236, 25)
  }
  .logout {
      margin: 10px 0;
  }

  /* aside */
  .el-aside {
        background-color:rgb(49,55,67);
        color: #333;
        height: calc(100vh - 60px);
  }
  .el-menu-item-group .el-menu-item:hover{
    background: #34466a !important;
    color: #fff !important;
    }
  .el-menu {
      border:none;
  }
  .toggle-button {
      text-align: center;
      color: #fff;
      font-size:10px;
      line-height: 24px;
      letter-spacing: 0.2em;
      cursor: pointer;
      user-select: none;
      background-color: #34466a;
  }
  /* main */
  .el-main {
        background-color: #EAEDF1;
        color: #333;
        height: calc(100vh - 60px);
  }
</style>