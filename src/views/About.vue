<template>
  <div class="home">
    <mt-header fixed :title="content.title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="p-container">
      <p class="small-font" v-for="item in content.paraList" :key="item.id">{{item.paragraph}}</p>
    </div>
    <mt-tabbar fixed>
    <mt-tab-item id="1" icon="back">
      <a  @click="preChapter">上一章节</a>
    </mt-tab-item>
    <mt-tab-item id="2">
      <a @click="goCatalogue">目录</a>
    </mt-tab-item>
    <mt-tab-item id="3" icon="next">
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
      id: 1,
      total: 0
    }
  },
  created() {
    if(this.$route.params.id) this.id = this.$route.params.id
    if(this.$route.params.total) this.total = this.$route.params.total
  },
  mounted() {
    this.ajaxMethod({
      method: 'get',
      url: 'http://localhost:8080/getContent',
      data: { id: this.id },
    }).then(res => {
      this.content = res
    })
  },
  methods: {
    goCatalogue() {
      this.$router.push('/')      
    },
    preChapter() {
      if(this.id > 1) {
        this.id--
        this.ajaxMethod({
          method: 'get',
          url: 'http://localhost:8080/getContent',
          data: { id: this.id },
        }).then(res => {
          this.content = res
        })
      } else {
        this.$toast('没有更多了~')
      }
    },
    nextChapter() {
      if(this.id < this.total) {
        this.id++
        this.ajaxMethod({
          method: 'get',
          url: 'http://localhost:8080/getContent',
          data: { id: this.id },
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

