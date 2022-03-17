<template>
  <div>
	<el-dialog title="登录" :visible.sync="outerVisible" width="30%"  class="dialog">
		<div class="loginBox">
				<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
					<!-- 用户名 -->
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item prop="password">
						<el-input
							v-model="loginForm.password"
							placeholder="请输入密码"
							prefix-icon="el-icon-lock"
							type="password"
						></el-input>
					</el-form-item>
					<!-- 按钮区域 -->
					<el-form-item class="btns">
						<el-button type="success" @click="login">登录</el-button>
					</el-form-item>
				</el-form>
        <!--内层对话框（注册窗口）-->
			<div slot="footer" class="dialog-footer">
			<el-link type="primary" @click="getRegister(true)">还没有账号？点击立即注册！</el-link>
      <register ref="Register"></register>
			</div>
		</div>	
  </el-dialog>
	</div>
  
</template>

<script>
import Register from './Register.vue'
  export default {
    name: 'Login',
    components:{
      Register,
    },
    data() {
      return {
        outerVisible: false,
				loginForm: {
					username: "",
					password: "",
        },
			// 这是表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 3,
            max: 16,
            message: "用户名长度在 3 到 16 个字符",
            trigger: "change",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 32,
            message: "密码长度在 6 到 32 个字符",
            trigger: "change",
          },
        ],
      },
      };
    },
		methods: {
    login() {
			this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.usersApi
          .getLogin(this.loginForm.username,this.loginForm.password)
          .then((res)=>{
            console.log("登录res",res);//这个res不需要
            this.$message({
                message:'登录成功！',
                type:'success',
              });
            this.outerVisible = false;
            setTimeout(() => {
                this.$axios
                  .get("/api/access/me")
                  .then((res) => {
                    this.$store.commit("globalLogin",res.data);
                    // this.global.app.$forceUpdate(); // update navbar and global.me
                    console.log("globalLogin",this.$store.state.global);
                  })
                  .catch((p) => this.$message.errmsg(p));
              }, 500);
          })
          .catch((p) => {
            this.$message.error('用户名或密码错误')
            console.log(p);
          });
        } else {
          console.log("err");
          return false;
        }
      });
    },
    gotoLogin(boolValue){
				this.outerVisible = boolValue;
		},
    getRegister(boolValue){
      this.$refs.Register.gotoregister(boolValue);
    },
  },
  }
</script>

<style>
.btns {
  display: flex;
  justify-content: flex-end;
}
.dialog{
	border-radius: 10px;
	height: auto;
}
.loginBox {
  width: 75%;
  margin: 0 auto;
}
</style>