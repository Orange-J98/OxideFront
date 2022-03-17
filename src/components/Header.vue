<template>
  <div class="headerBox">
    <div class="flex flex-row absolute inset-x-0">
      <el-container>
        <el-header id="head-nav">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo absolute inset-x-0"
            mode="horizontal"
            @select="handleSelect"
          >
            <div style="display: flex; outline: none">
              <img
                class="my-1 mr-4"
                src="@/assets/logo.png"
                width="80"
                height="20"
              />
              <el-menu-item index="1">主页</el-menu-item>
              <el-menu-item index="4">新闻通告</el-menu-item>
              <el-menu-item index="5">防疫常识与辟谣</el-menu-item>
              <div style="flex-grow: 1" class="empty"></div>
              <img src="@/assets/title.png" width="570" height="18" />

              <div v-if="this.$store.state.global.me">
                <el-submenu index="7">
                  <template slot="title" class="nameBox">{{
                    this.$store.state.global.me.username
                  }}</template>
                  <el-menu-item index="7-2" @click="logout">登出</el-menu-item>
                </el-submenu>
              </div>
              <div v-if="!this.$store.state.global.me">
                <div style="display: flex">
                  <div style="flex-grow: 1" class="empty"></div>
                  <el-menu-item @click="getLogin(true)">登录</el-menu-item>
                  <login ref="Login"></login>
                  <el-menu-item @click="getRegister(true)">注册</el-menu-item>
                  <register ref="Register"></register>
                </div>
              </div>
            </div>
          </el-menu>
        </el-header>
      </el-container>
    </div>
  </div>
</template>

<script>
import Register from "./Register.vue";
import Login from "./Login.vue";
export default {
  name: "Header",
  components: {
    Register,
    Login,
  },
  created() {
    this.usersApi
      .getMe()
      .then((res) => {
        this.$store.commit("globalLogin", res.data);
      })
      .catch((p) => this.$message.error("出错了...." + p));
  },
  watch: {
    watchThese() {
      this.activeIndex = this.$currentIndex;
    },
  },
  computed: {
    watchThese() {
      return { ci: this.$currentIndex };
    },
  },
  data() {
    return {
      username: "",
      activeIndex: this.$currentIndex,
      dest: [
        "/debug",
        "/elders-home",
        "/FlightInf",
        "/SickmanCheck",
        "/News",
        "/TipsList",
      ],
    };
  },
  mounted() {},
  methods: {
    logout() {
      this.usersApi
        .getLogout()
        .then(() => {
          this.$message({
            message: "登出成功",
            type: "success",
          });
          setTimeout(() => {
            this.$store.commit("globalLogout");
            this.$forceUpdate();
            // this.$router.push({ path: "/CovidMap"});
          }, 500);
        })
        .catch((p) => this.$message.error("出错了...." + p));
    },
    getRegister(boolValue) {
      this.$refs.Register.gotoregister(boolValue);
    },
    getLogin(boolValue) {
      this.$refs.Login.gotoLogin(boolValue);
    },
    handleSelect(key) {
      // console.log(key, this.dest[key]);
      this.$currentIndex = key;
      this.$router.push(this.dest[key]);
    },
  },
};
</script>

<style>
.el-submenu__title {
  padding-left: 3px !important;
  padding-right: 3px !important;
}
.el-submenu__icon-arrow {
  position: static !important;
}
.headerBox,
.el-header,
.el-menu-item,
.el-menu-demo absolute inset-x-0 el-menu--horizontal el-menu,
.nameBox,
.empty,
.el-submenu__title {
  background-color: #fff;
}
</style>

