<template>
  <div class="home">
    <mt-header fixed :title="book.title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="list-container">
      <a v-for="item in lists" :key="item.id"  @click="goContent(item.id)">
        <mt-cell :title="item.title"></mt-cell>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      book: {
        url: '',
        title: '目录'
      },
      lists:[]
    }
  },
  created() {
    if(this.$route.params.url && this.$route.params.title) {
      this.book.url = this.$route.params.url
      this.book.title = this.$route.params.title
      sessionStorage.setItem("book",JSON.stringify(this.$route.params))
    } else {
      this.book = JSON.parse(sessionStorage.getItem("book")) 
    }
  },
  mounted() {
    this.ajaxMethod({
      method: 'get',
      url: '/getLists',
      data: { url: this.book.url }
    }).then(res => {
      this.lists = res
    })
  },
  methods: {
    goContent(id){
      this.$router.push({name:'content', params:{ id, total: this.lists.length }})
    }
  }
}
</script>

<style scoped>
  .list-container{
    margin-top: 35px;
  }
</style>
