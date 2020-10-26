<template>
  <section>
  <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">

      <!-- table -->
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="#"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="path"
        label="权限路径"
        align="center">
      </el-table-column>
      <el-table-column
        prop="level"
        label="权限等级"
        align="center">
        <template slot-scope="data">
        <el-button type="primary" plain v-if="data.row.level === '0'">一级</el-button>
        <el-button type="success" plain v-else-if="data.row.level === '1'">二级</el-button>
        <el-button type="warning" plain v-else @click="type(data)">三级</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>


  </section>
</template>

<script>
export default {
  
  data() {
    return {
      tableData: [],
      }
    },
    methods: {
        handleClick(row) {
          console.log(row);
        },
        getRightsList() {
          this.$myHttp({
            url: 'rights/list',
            method: 'get'
          }).then(back => {
            console.log(back)
            let {data,meta} = back.data
            if (meta.status !== 200 ) return this.$message.error('获取权限列表失败');
            this.tableData = data
          })
        },
      },
    mounted() {
      this.getRightsList()
    }
}
</script>

<style scope>
  .el-table-column {
    text-align: center;
  }
</style>