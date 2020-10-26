<template>
  <section>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
 
    <!-- 卡片 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col :span="3"><el-button type="primary" @click="addRoleShow = true">添加角色</el-button></el-col>
      </el-row>

      <!-- 角色列表 -->
    <el-table
      :data="listRoles"
      border
      stripe
      style="width: 100%">
    <el-table-column type="expand">
      <!-- 扩展 -->
      <template slot-scope="scope">

        <el-row v-for="(tag1,i1) in scope.row.children" :key="tag1.id" :class="['bdtop','vertical-center']">
          <!-- 渲染一级权限 -->
          <el-col :span="5">
            <el-tag closable @close="tagColse(tag1.id,scope.row,i1)">
              {{tag1.authName}}
            </el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>

          <!-- 渲染二级权限 -->
          <el-col :span="19">
            <el-row :class="[i2 === 0 ? '' : 'bdtop','vertical-center']" v-for="(tag2,i2) in tag1.children" :key="tag2.id">
              <el-col :span="6">
                <el-tag closable  type="success" @close="tagColse(tag2.id,scope.row,i2,tag1.children)">
                  {{tag2.authName}}
                </el-tag>
              <i class="el-icon-caret-right"></i>
              </el-col>

              <!-- 三级 不给span 默认占24-->
              <el-col :span="18">
                <el-tag closable type="warning" @close="tagColse(tag3.id,scope.row,i3,tag2.children)" v-for="(tag3,i3) in tag2.children" :key="tag3.id">
                  {{tag3.authName}}
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </template>
    </el-table-column>
    <el-table-column
      label="名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="roleDesc">
    </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="data">
          <el-button size="mini" icon="el-icon-edit"  type="primary" @click="editRoleFn(data.row)">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete"  type="danger" @click="roleDel(data.row.id)">删除</el-button>
          <el-button size="mini" icon="el-icon-setting"  type="warning" @click="rightsShow(data.row)">分配权限</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色弹出框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleShow"
      width="30%"
      :before-close="addRoleClose">
      <!-- form -->
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="addRoleForm">
        <el-form-item label="角色名称">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- //form -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleShow = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editRoleShow"
      width="30%"
      :before-close="addRoleClose">
      <!-- form -->
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="editRoleForm">
        <el-form-item label="角色名称">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- //form -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleShow = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog
      title="授予角色权限"
      :visible.sync="toRightsShow"
      width="40%"
      :before-close="addRoleClose" @close="showRightsClose">
      <!-- form -->
      <el-tree
        ref="treeRef"
        :data="rightsData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="RightsId"
        :props="rightsProps">
      </el-tree>
      <!-- //form -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="toRightsShow = false">取 消</el-button>
        <el-button type="primary" @click="toRights">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
   data() {
     return {
      /* 角色列表 */
      listRoles: [], 
      /* 添加角色 */
      addRoleShow: false,
      labelPosition: 'right',
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },

      /* 编辑角色 */
      editRoleShow: false,
      editRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      roleId: 0,

      /* 授予权限 */
      rightsData: [],
      toRightsShow: false,
      setRightsRoleId: 0,
      rightsProps: {
          children: 'children',
          label: 'authName'
        },
      /* 默认选中的Id数组 */
      RightsId: [],
     }
   },
   methods: {
     /* 关闭tag */
     tagColse(tag3Id,role,i3,arr) {
      /* 是否删除 */
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$myHttp({
            url: `roles/${role.id}/rights/${tag3Id}`,
            method: 'delete'
          }).then(back => {
            let {data,meta} = back.data
            if (meta.status !== 200) return this.$message.error('删除权限失败');
            this.$message.success('删除成功')
            /* 给当前row重新赋值 */
            role.children = data
            /* 移除tag */
            // arr.splice(i3, 1)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },


     /* 添加角色 */
     addRole() {
       this.$myHttp({
         url: 'roles',
         method: 'post',
         data: this.addRoleForm
       }).then(back => {
         console.log(back)
         let {data,meta} = back.data
         if (meta.status !== 201) return this.$message.error('添加角色失败');
         this.$message.success('已添加角色') 
         this.addRoleShow = false
         this.getRolesList()
       })
     },
     addRoleClose(done) {
       this.$confirm('确认关闭？').then(_ => { done()}).catch(_ => {});   
     },


     /* 编辑角色 */
     editRoleFn(role) {
       this.editRoleShow = true
       this.editRoleForm.roleName = role.roleName
       this.editRoleForm.roleDesc = role.roleDesc
       this.roleId = role.id
     },
     editRole() {
       this.$myHttp({
         url: `roles/${this.roleId}`,
         method: 'put',
         data: this.editRoleForm
       }).then(back => {
         let {data,meta} = back.data
         if (meta.status !== 200) return this.$message.error('更改角色失败');
         this.$message.success('更改角色成功')
         this.editRoleShow = false
         this.getRolesList()
       })
     },


     /* 删除角色 */
     roleDel(roleId) {
       this.$confirm('此操作将永久删除该权限, 是否继续','提示',{
         confirmButtonText: '确定',
         cancelButtonText: '取消'
       }).then(() => {
         /* 确认删除 */
         this.$myHttp({
           url: `roles/${roleId}`,
           method: 'delete'
         }).then(back => {
           let {data,meta} = back.data
           if (meta.status !== 200) return this.$message.error('删除角色失败');
           this.$message.success('删除成功') 
           /* 重新获取 */
           this.getRolesList()
         })
       }).catch(() => {
         /* 取消删除 */
         this.$message.info('已取消删除')
       })
     },


     /* 分配权限 */
     toRights() {
       /* 选中的key */
       const a = this.$refs.treeRef.getCheckedKeys()
       /* 半选的key */
       const b = this.$refs.treeRef.getHalfCheckedKeys()
       const keys = a.concat(b).join(',')
       this.$myHttp({
         url: `roles/${this.setRightsRoleId}/rights`,
         method: 'post',
         data: {rids: keys}
       }).then(back => {
         let {data,meta} = back.data
         if (meta.status !== 200) return this.$message.error('添加权限失败');
         this.$message.success('添加权限成功')
         this.toRightsShow = false
         this.getRolesList()
       })
     },
     rightsShow(role) {
       this.setRightsRoleId = role.id
       this.toRightsShow = true
       this.$myHttp({
         url: 'rights/tree',
         method: 'get'
       }).then(back => {
         let {data,meta} = back.data
         if (meta.status !== 200) return this.$message.error('获取权限列表失败');
         this.rightsData = data 

         /* 获取权限 */
         this.RightsId = []
         this.getLeafKeys(role,this.RightsId)
       })
     },
     /* 通过递归的形式，获取角色三级权限的id */
     getLeafKeys(node,arr) {
       /* 如果节点下面没有children属性，则是三级节点 */
       if (!node.children) {
         return arr.push(node.id)
       }

       node.children.forEach(item => {
         this.getLeafKeys(item,arr)
       })
     },
     /* 清空权限 */
     showRightsClose() {
       this.RightsId = []
     },


     /* 角色列表 */
     getRolesList() {
       this.$myHttp({
         url: 'roles',
         method: 'get'
       }).then(back => {
         let {data,meta} = back.data
         if (meta.status !== 200) return this.$message.error('获取角色列表失败');
         this.listRoles = data
       })
     }
   },
   created() {
      this.getRolesList()
   }
}
</script>

<style scope>
  .bdtop {
    border-top: 1px solid #ccc;
  }
  .bdbottom {
    border-bottom: 1px solid #ccc;
  }
  .el-tag {
    margin: 7px;
  }

</style>