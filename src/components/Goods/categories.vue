<template>
  <section>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col :span="3"><el-button type="primary" @click="addGoodsShow = true">添加商品</el-button></el-col>
      </el-row>

       <!-- 表格 -->
  
       <!-- 分页 -->
       
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      addGoodsShow: false,
      /* 商品分类数据列表 */
      cateList: [],
      /* 查询数据 */
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  methods: {
    getCategoriesList() {
      this.$myHttp({
        url: 'categories',
        method: 'get',
        data: this.queryInfo
      }).then(back => {
        let {data,meta} = back.data
        if (meta.status !== 200) return this.$message.error('获取商品列表失败')
        this.cateList = data
        console.log(back)
      })
    }
  },
  mounted() {
    this.getCategoriesList()
  }

}
</script>

<style>

</style>