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
      上一章
    </mt-tab-item>
    <mt-tab-item id="2">
      目录
    </mt-tab-item>
    <mt-tab-item id="3" icon="next">
      下一章
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
      id: 1
    }
  },
  created() {
    if(this.$route.params.id) this.id = this.$route.params.id
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

