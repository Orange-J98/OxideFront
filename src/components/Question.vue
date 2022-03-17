<template>
  <div class=""  style="background-color:#66a9c9">
    <div class="quetion w-9/12 ml-auto mr-auto bg-white px-8 pb-8" style="min-height: 1080px">
      <div class="text-left">
        <el-button type="info" @click="back">问题列表</el-button>
      </div>
      <div
        class="content text-left"
        v-if="questionId && question && answerList"
      >
        <div class="question mt-6 mb-6">
          <p class="font-bold text-3xl">{{ question.title }}</p>
          <p class="pt-6 pl-4 pb-2">提问者：@{{ question.quser.username }}</p>
          <p class="text-xl" style="white-space: pre-wrap">
            问题内容：
          </p>
          <p class="pt-4">
            {{ question.content }}
          </p>
        </div>
        <div class="answers mb-20">
          <p class="text-2xl mb-4">{{ answerList.length }}条回答</p>
          <div
            class="border-t-2 border-b-2 divide-y-2 border-gray-200 text-left"
          >
            <div class="py-3" v-for="a in answerList" :key="a.id">
              <p class="pt-2 tracking-wider leading-relaxed">{{ a.content }}</p>
              <div class="ml-4 flex flex-row">
                <div class="font-bold text-red-500" v-if="a.official">
                  {{ a.quser.username }} <a class="el-icon-s-check"></a>官方认证
                </div>
                <div v-if="!a.official">{{ a.quser.username }}</div>
                <div
                  class="ml-6 cursor-pointer text-blue-400"
                  @click="reply(a.quser.username, a.id)"
                >
                  回复
                </div>
              </div>
            </div>
          </div>
          <div class="new-answer">
            <p class="text-2xl my-4">发表回答：</p>
            <p class="m-4">
              <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 100 }"
                v-model="newAnswer.content"
              ></el-input>
            </p>

            <p class="text-right mr-4">
              <el-button type="primary" @click="addressAnswer">发表</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Question",
  created() {
    this.init();
  },
  methods: {
    back() {
      this.$router.push("/TipsList?activeName=question");
    },
    init() {
      this.questionId = this.$route.params.id;

      this.usersApi
        .getQuestion(this.questionId)
        .then((res) => {
          this.question = res.data;
        })
        .catch((p) => {
          console.log(p);
        });

      this.usersApi
        .getAnswerList(this.questionId)
        .then((res) => {
          this.answerList = res.data;
        })
        .catch((p) => {
          console.log(p);
        });
    },
    reply(ansUsername, ansId) {
      this.newAnswer.replyTo = ansId;
      this.newAnswer.content =
        "回复@" + ansUsername + ": " + this.newAnswer.content;
    },
    addressAnswer() {
      if (this.newAnswer.content.length == 0) {
        this.$message.error("内容不能为空");
        return;
      }
      if (this.newAnswer.content.length > 255) {
        this.$message.error("内容长度不能大于255字");
        return;
      }
      this.newAnswer.questionId = this.questionId;
      this.usersApi
        .postAnswer(this.newAnswer)
        .then(() => {
          this.$message.success("发表成功");
          this.$router.go(0);
        })
        .catch((p) => {
          this.$message.error("发表失败：用户未登录");
          console.log(p);
        });
    },
  },
  data() {
    return {
      questionId: null,
      question: null,
      answerList: null,

      // questionId: 1,
      // question: {
      //     "content": "这是个传奇的故事：志愿军特等功臣不知自己立大功，从战场悄然回乡30余载，一度被认为已经“牺牲”。后经邓小平下令找回，朝鲜主席金日成亲自接见并颁发“一级自由独立勋章”，最终他在朝鲜亲手取回了自己的“遗像”。这个真实故事的主人公就是柴云振，也是今天29名“七一勋章”获得者中3位已故党员之一。2018年12月26日，柴云振逝世，享年93岁。\n在他的儿子柴兵荣看来，父亲从来不认为自己是功臣、英雄。“我的父亲作为一个老共产党员，啥都不图，他很正直。”柴云振曾拒绝30多万补贴，只从曾经洒下热血的朝鲜带回了几个苹果。“这么多战友牺牲在朝鲜战场上，我还活着已经很满足了，我不要这个钱。”柴云振这样告诉大家。\n柴兵荣回忆称，父亲对家人子女也要求严格，由于对部队有深厚情感，他要求孩子必须入党，每一代人都要到部队里锻炼 作者：南方都市报 https://www.bilibili.com/read/cv11945624?from=category_0 出处：bilibili",
      //     "id": "1",
      //     "quser": {
      //       "createdAt": 0,
      //       "id": "string",
      //       "updatedAt": 0,
      //       "username": "我叫ZCZ"
      //     },
      //     "senderId": "string",
      //     "title": "题目1"
      //   },
      // answerList: [
      //   {
      //     "content": "都不图，他很正直。”柴云振曾拒绝30多万补贴，只从曾经洒下热血的朝鲜带回了几个苹果。“这么多战友牺牲在朝鲜战场上，我还活着已经很满足了，我不要这个钱。”柴云振这样告诉大1",
      //     "official": true,
      //     "questionId": "string",
      //     "quser": {
      //       "createdAt": 0,
      //       "id": "string",
      //       "updatedAt": 0,
      //       "username": "北航"
      //     },
      //     "replyTo": "string",
      //     "senderId": "string"
      //   },
      //   {
      //     "content": "都不图，他很正直。”柴云振曾拒绝30多万补贴，只从曾经洒下热血的朝鲜带回了几个苹果。“这么多战友牺牲在朝鲜战场上，我还活着已经很满足了，我不要这个钱。”柴云振这样告诉大2",
      //     "official": false,
      //     "questionId": "string",
      //     "quser": {
      //       "createdAt": 0,
      //       "id": "string",
      //       "updatedAt": 0,
      //       "username": "ZCZ"
      //     },
      //     "replyTo": "string",
      //     "senderId": "string"
      //   }
      // ],
      newAnswer: {
        content: "",
        official: false,
        questionId: null,
        replyTo: null,
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
