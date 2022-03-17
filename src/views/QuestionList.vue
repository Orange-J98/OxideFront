<template>
  <div class="text-left">
    <div
      class="question-list border-t-2 border-b-2 divide-y-2 border-gray-200"
      v-if="qList"
    >
      <div class="group p-4" v-for="q in qList" :key="q.id">
        <router-link
          :to="'Question/' + q.id"
          class="text-2xl hover:text-green-700 font-bold"
          >{{ q.title }}</router-link
        >

        <p class="pt-2 tracking-wider leading-relaxed" style="text-indent: 2em">
          @{{ q.quser.username }}: {{ q.content }}
        </p>
        <!-- <p class="pt-4">{{q.quser.username}}</p> -->
      </div>
    </div>
    <div class="new-question my-4">
      <p class="text-2xl my-4">发表问题：</p>
      <div class="m-4">
        <div class="flex flex-row items-center">
          <div class="text-xl w-24">标题：</div>
          <el-input v-model="newQuestion.title"></el-input>
        </div>
        <p class="text-xl my-4">内容：</p>
        <p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 100 }"
            v-model="newQuestion.content"
          ></el-input>
        </p>
      </div>

      <p class="text-right mr-4">
        <el-button type="primary" @click="addressQuestion">发表</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionList",
  created() {
    this.init();
  },
  methods: {
    init() {
      this.usersApi
        .getQuestionList()
        .then((res) => {
          this.qList = res.data;
        })
        .catch((p) => {
          console.log(p);
        });
    },
    goto(url) {
      this.$router.push(url);
    },
    addressQuestion() {
      if (this.newQuestion.title.length == 0) {
        this.$message.error("标题不能为空");
        return;
      }
      if (this.newQuestion.title.length > 30) {
        this.$message.error("标题长度不能大于30字");
        return;
      }
      if (this.newQuestion.content.length == 0) {
        this.$message.error("内容不能为空");
        return;
      }
      if (this.newQuestion.content.length > 1000) {
        this.$message.error("内容长度不能大于1000字");
        return;
      }
      this.usersApi
        .postQuestion(this.newQuestion)
        .then(() => {
          this.$message.success("发表成功");
          this.$router.go(0)
          this.$router.push("/TipsList?activeName=question");
        })
        .catch((p) => {
          this.$message.error("发表失败：用户未登录");
          console.log(p);
        });
    },
  },
  data() {
    return {
      qList: null,
      newQuestion: {
        title: "",
        content: "",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
