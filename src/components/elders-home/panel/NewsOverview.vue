<template>
  <div class="news-overview">
    <!-- 新闻 -->
    <div class="news rounded-md border-2 border-blue-100">
      <p class="bg-blue-100">新闻</p>
      <div class="text-left">
        <el-skeleton v-if="!msgs" :rows="10" animated />
        <div v-if="msgs">
          <div v-for="m in msgs" :key=m.link>
             <el-link :href="m.link">{{m.title}}</el-link>
          </div>
        </div>
      </div>
      <el-button class="w-80" @click="goto('/News', 4)" size="medium">查看更多</el-button>
    </div>

    <!-- 通告 -->
    <div class="posts rounded-md border-2 border-blue-100 mt-4">
      <p class="bg-blue-100">官方通告 
      </p>
      <div class="text-left">
        <el-skeleton v-if="!govs" :rows="10" animated />
        <div v-if="govs">
          <div v-for="g in govs" :key=g.link>
             <el-link :href="g.link">{{g.title}}</el-link>
          </div>
        </div>
      </div>
      <el-button class="w-80" @click="goto('/News', 4)" size="medium">查看更多</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsOverview',
  created(){
    this.init()
  },
  
  data(){
    return {
      msgs: null,
      govs: null, 
    }
  },
  methods: {
    init(){
      var listM = []
      var listG = []
      var mLength = 0
      var gLength = 0
      this.usersApi
        .getNews()
        .then((res) => {
          var data = res.data;
          data.forEach((element) => {
            var item = {
              title: element.title,
              link: element.link,
            };
            if (element.type == "msg" && mLength<15) {
              listM.push(item);
              mLength++
            } else if (element.type == "gov" && gLength<15) {
              listG.push(item);
              gLength++
            }
          });
          this.msgs = listM
          this.govs = listG
          console.log("300",this.msgs, this.govs)
        })
        .catch((p) => {
          console.log(p);
        });
    },
    goto(url, index){
      this.$currentIndex = index
      this.$router.push(url)
    }
  }
}
</script>


<style scoped>
.news,.posts{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
