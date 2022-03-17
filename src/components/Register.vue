<template>
<div>
	<el-dialog title="注册" :visible.sync="outerVisible" width="30%"  class="dialog" append-to-body center>
			<div class="register_box">
				<!-- 注册表单区域 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        class="register_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-view"
            type="password"
          ></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item prop="checkPass">
          <el-input
                  type="password"
                  v-model="registerForm.checkPass"
                  autocomplete="off"
                  prefix-icon="el-icon-lock"
                  placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetregisterForm">重置</el-button>
        </el-form-item>
      </el-form>
			</div>
  </el-dialog>
</div>
  
</template>

<script>
  export default {
		name: 'Register',
		data() {
			var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
			};
			var checkDescpt = (rule, value, callback) => {
				if (value.length > 32) {
					callback(new Error("最多输入32个字符，字数超出限制"));
					} else {
						callback();
					}
					};
      return {
        outerVisible: false,
				// 这是注册表单的数据绑定对象
				registerForm: {
					username: "",
					password: "",
					checkPass: "",
				},
				// 这是表单验证规则对象
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入账号", trigger: "change" },
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
            max: 16,
            message: "密码长度在 6 到 32 个字符",
            trigger: "change",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        description: [{ validator: checkDescpt, trigger: "change" }],
      },
      }
		},
		methods:{
			// 点击重置按钮，重置登录表单
			resetregisterForm() {
				this.$refs.registerFormRef.resetFields();
				},
			gotoregister(boolValue){
				this.outerVisible = boolValue;
			},
			register() {
				this.$refs.registerFormRef.validate((valid) => {
					if (valid) {
						console.log("registerForm",this.registerForm)
						this.usersApi
						.createUser(this.registerForm.username,this.registerForm.password)
						.then((res)=>{
							console.log("注册res",res);
							this.$message({
                message:'注册成功！',
                type:'success'
              });
							this.outerVisible = false;
          })
          .catch((p) => {
            this.$message.error("用户名已被注册，换个名字吧！");
            console.log(p)
            });
					} else {
						console.log("err");
						return false;
					}
				});
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
.register_box {
  width: 75%;
  margin: 0 auto;
}
</style>