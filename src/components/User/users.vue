<template>
  <section>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 卡片 -->
  <el-card class="box-card">
    <!-- 搜索&添加 -->
    
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchVal">
          <el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
  </el-card>
  
  </section>
</template>

<script>
export default {
  data() {
    return {
      /* 搜索值 */
      searchVal:'',
      /* 请求参数 */
      queryInfo: {
        'query': '',
        'pagenum': 1,
        'pagesize': 2
      },
      /* 用户列表数据 */
      userList: [],
      total: 0,
      /* 表格 */
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods: {
    /* 用户搜索 */
    searchFn() {
      console.log(this.searchVal)
    },
    /* 用户列表展示 */
    getUserList() {
      this.$myHttp({
        url:'users',
        method: 'get',
        data: this.queryInfo
      }).then(back => {
        console.log(back)
        let {data,meta} = back.data;
        if (meta.status !== 200) return this.$message.error('获取用户列表失败');
        this.userList = data;
      })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style>
 .el-table {
   margin-top: 20px;
 }
</style>