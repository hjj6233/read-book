<template>
  <div class="home">
    <mt-header fixed :title="content.title">
      <router-link to="/list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="p-container">
      <p class="small-font" v-for="item in content.paraList" :key="item.id">{{item.paragraph}}</p>
    </div>
    <mt-tabbar fixed>
    <mt-tab-item icon="back">
      <a  @click="preChapter">上一章节</a>
    </mt-tab-item>
    <mt-tab-item>
      <a @click="goCatalogue">目录</a>
    </mt-tab-item>
    <mt-tab-item icon="next">
      <a @click="nextChapter">下一章节</a>
    </mt-tab-item>
  </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      content:{},
      chapter: {
        id: 1,
        total: 0
      }
    }
  },
  created() {
    if(this.$route.params.id && this.$route.params.total) {
      this.chapter.id = this.$route.params.id
      this.chapter.total = this.$route.params.total
      sessionStorage.setItem("chapter",JSON.stringify(this.$route.params))
    } else {
      this.chapter = JSON.parse(sessionStorage.getItem("chapter")) 
    }
  },
  mounted() {
    this.ajaxMethod({
      method: 'get',
      url: '/getContent',
      data: { id: this.chapter.id },
    }).then(res => {
      this.content = res
    })
  },
  methods: {
    goCatalogue() {
      this.$router.push('/list')      
    },
    preChapter() {
      if(this.chapter.id > 1) {
        this.chapter.id--
        this.ajaxMethod({
          method: 'get',
          url: '/getContent',
          data: { id: this.chapter.id },
        }).then(res => {
          this.content = res
        })
      } else {
        this.$toast('没有更多了~')
      }
    },
    nextChapter() {
      if(this.chapter.id < this.chapter.total) {
        this.chapter.id++
        this.ajaxMethod({
          method: 'get',
          url: '/getContent',
          data: { id: this.chapter.id },
        }).then(res => {
          this.content = res
        })
      } else {
        this.$toast('没有更多了~')
      }
    }
  }
}
</script>

<style scoped>
  .small-font {
    font-size: 14px;
    text-align: left;
    text-indent: 10px;
  }
  .p-container{
    margin: 55px 0;
  }
</style>

