<template>
  <div style="background-color:#66a9c9">
  <div class="TipsList mx-40" >
      <el-tabs class="content" type="border-card" tab-position="left" v-model="activeName">
        <el-tab-pane label="防疫常识" class="border-t-2 border-b-2 divide-y-2 border-gray-200 text-left" name="commonSense">
          <div class="p-4 group" v-for="item in commonSense" :key=item.id>
            <p class="text-2xl group-hover:text-black text-blue-600 font-medium">{{item.title}}</p>
            <p class="pt-2 tracking-wider leading-relaxed" style="text-indent: 2em">{{item.content}}</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="防疫辟谣" class="border-t-2 border-b-2 divide-y-2 border-gray-200 text-left" name="refute">
          <div class="p-4 group" v-for="item in refute" :key=item.id>
            <p class="text-2xl group-hover:text-black text-blue-600 font-medium">{{item.title}}</p>
            <p class="pt-2 tracking-wider leading-relaxed" style="text-indent: 2em">{{item.content}}</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="防疫问答" class="border-t-2 border-b-2 divide-y-2 border-gray-200 text-left" name="question">
          <div class="question">
            <question-list></question-list>
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>
  </div>
</template>

<script>
import QuestionList from '../views/QuestionList.vue'

export default {
  name: 'TipsList',

  components: {
    QuestionList
  },

  created(){
    this.getTips()
    if(this.$route.query.activeName!=null)
      this.activeName = this.$route.query.activeName;
  },
  methods: {
    getTips() {
      this.usersApi
        .getTips()
        .then((res)=>{
          var data = res.data
          data.forEach(element => {
            if(element.type == '常识'){
              this.commonSense.push(element)
            }
            else if(element.type == '辟谣'){
              this.refute.push(element)
            }
          });
        })
        .catch((p)=>{console.log(p)})
    }
  },
  data(){
      return {
          commonSense: [],
          refute: [],
          activeName: 'commonSense'
      }
  }

}
</script>

<style>
.content{
  border: 0px !important;
  box-shadow: 0px !important;
}

.el-tabs__content{
  padding-top: 0px !important;
}

.el-tabs__item {
  width: 166px !important;
  height: 60px !important;
  line-height: 60px !important;
  text-align: center !important;
  font-size: 16px !important;
  font-weight: bold !important;
}

.el-tabs__nav-scroll {
  display: flex !important;
  flex-direction: column !important;
  /* background-color: #409EFF; */
}

</style>
