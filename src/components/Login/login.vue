<template>
  <div class="login-box">
    <div class="avatar">
      <img src="../../assets/images/logo.png" alt="logo" />
    </div>
    <div class="form-top"></div>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm form"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
          prefix-icon="iconfont icon-user"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          prefix-icon="iconfont icon-3702mima"
          ><i class="iconfont icon-3702mima"></i
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.passoword !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.username !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        password: [
          { validator: validatePassword, trigger: "blur" },
          { min: 5, max: 10, message: "密码长度5 ~ 10 个字符之间" },
        ],
        username: [{ validator: validateUsername, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm() {
      /* 
       this.$refs.ruleForm.validate(async valid => {
         if (!valid) return;
         const result = await this.$myHttp.post("login",this.ruleForm);
       });
      */
      this.$refs.ruleForm.validate((bool) => {
        if (bool) {
          this.$myHttp({
            url: "login",
            method: "post",
            data: {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            },
          }).then((back) => {
            const { data, meta } = back.data;
            if (meta.status === 200) {
              this.$message({
                type: "success",
                message: "登陆成功",
              });
              
              /* 保存token */
              window.localStorage.setItem(
                "token",
                back.config.headers.Authorization
              );

              /* 编程式导航 */
              this.$router.push({ path: "/home"});
            } else {
              this.$message({
                type: "error",
                message: "账号或密码错误",
              });
            }
          });
        } else {
          return;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
/* less 表示支持less语法  scoped 表示css只在当前组件生效  去掉scoped则是全局css*/
.login-box {
  width: 460px;
  height: 300px;
  background-color: #fff;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 40%);
  border-radius: 3px;
}
.login-box > .avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid rgba(0, 0, 0, 0.3);
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  overflow: hidden;
}
.avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  animation: rotate 3s infinite 0s linear;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
.form-top {
  height: 110px;
}
.form {
  margin-right: 60px;
}
</style>
