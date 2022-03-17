<template>
  <div>
    <div class="background">
      <!-- <img :src="imgSrc" alt="" /> -->
      <div style="position: fixed;top:0px;bottom:0px;left:0px;right:0px;background-color:rgba(255,255,255,0.5);z-index:-1"></div>
    </div>
    <div class="content">
      <div class="news">
        <div
          class="box"
          style="overflow: auto; top:60px; bottom: 10px"
          v-infinite-scroll="load1"
        >
          <div
            class="text-3xl pb-3 mt-3"
            style="color: #1661ab; font-weight: bold"
          >
            新闻

            <span class="text-sm">
              <a
                target="_blank"
                href="https://lab.isaaclin.cn/nCoV/api/news"
                class="hover:underline"
                >数据源1</a
              >

              <a
                target="_blank"
                href="https://voice.baidu.com/act/newpneumonia/newpneumonia/"
                class="hover:underline"
                >数据源2</a
              >
            </span>
          </div>
          <div class="box-news" v-for="msg in msgs.slice(0, len1)" :key="msg">
            <el-card shadow="always" class="box-card text-left">
              <div>
                <a
                  :href="msg.link"
                  class="
                    text-xl
                    font-black
                    hover:underline
                    hover:text-green-500
                  "
                  >{{ msg.title }}</a
                >
              </div>
              <br />
              <p class="text-left">{{ msg.content }}</p>
              <p class="text-right">发布时间：{{ msg.time }}</p>
            </el-card>
            <br />
          </div>
          <!-- <div class="load-more mr-bottom" v-if="len1<msgs.length" @click='loadMore1' >点击加载更多</div><br> -->
        </div>
        <div
          class="timeline"
          style="overflow: auto; top:60px; bottom: 10px"
          v-infinite-scroll="load2"
        >
          <div
            class="text-3xl pb-3 mt-3"
            style="color: #1661ab; font-weight: bold"
          >
            官方通告

            <span class="text-sm">
              <a
                target="_blank"
                href="http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml"
                class="hover:underline"
                >数据源1</a
              >

              <a
                target="_blank"
                href="http://www.nhc.gov.cn/xcs/yqjzqk/list_gzbd.shtml"
                class="hover:underline"
                >数据源2</a
              >
            </span>

            
          </div>

          <el-timeline>
            <el-timeline-item
              v-for="gov in govs.slice(0, len2)"
              :key="gov"
              :timestamp="gov.time"
              placement="top"
              class="text-left"
            >
              <el-card>
                <a
                  :href="gov.link"
                  class="text-left w-9 font-black hover:text-blue-600"
                  >{{ gov.title }}</a
                >
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    return this.requestData();
  },

  methods: {
    load1() {
      this.len1 += 6;
    },

    load2() {
      this.len2 += 10;
    },

    requestData() {
      this.usersApi
        .getNews()
        .then((res) => {
          var data = res.data;
          data.forEach((element) => {
            var item = {
              title: element.title,
              time: this.$moment.unix(element.time / 1000).format("YYYY-MM-DD"),
              link: element.link,
              content: element.content,
            };
            if (element.type == "msg") {
              this.msgs.push(item);
            } else if (element.type == "gov") {
              this.govs.push(item);
            }
            if (element.type == "gov") console.log("---", item.time);
          });
        })
        .catch((p) => {
          console.log(p);
        });
    },
  },

  data() {
    return {
      len1: 0,
      len2: 0,
      imgSrc: require("../assets/2.png"),
      msgs: [
        // {
        //   title: "标题1",
        //   time: "2020/2/10",
        //   link: "http://news.hexun.com/2020-02-04/200174116.html"
        // },
        // {
        //   title: "标题2",
        //   time: "2020/2/10",
        //   link: "http://news.hexun.com/2020-02-04/200174116.html"
        // }
      ],

      govs: [
        // {
        //   title: "标题3",
        //   time: "2020/2/10",
        //   link: "http://news.hexun.com/2020-02-04/200174116.html"
        // },
        // {
        //   title: "标题4",
        //   time: "2020/2/9",
        //   link: "http://news.hexun.com/2020-02-04/200174116.html"
        // }
      ],
    };
  },
};
</script>

<style>
.el-timeline-item__timestamp {
  color: #1661ab !important;
  font-weight: bold !important;
  font-size: 15px !important;
}
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 6px;
}
::-webkit-scrollbar {
  width: 15px;
  height: 10px;
}
.background {
  z-index: -1;
  position: fixed;
  opacity: 0.9;
  top:0px;
  bottom: 0px;
  left:0px;
  right:0px;
  background-image: url("../assets/2.png");
  background-size: cover; 
}

.box {
  margin-left: 2cm;
  /* left: 30px; */
  width: 55%;
  position: absolute;
}

.box-card {
  width: 100%;
  position: relative;
}

.timeline {
  margin-right: 2cm;
  /* left: 1050px; */
  width:30%;
  right: 30px;
  position: absolute;
}

.vh-fill {
  height: 100%;
}
</style>
