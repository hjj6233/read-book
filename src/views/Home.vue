<template>
  <div class="home">
    <mt-header fixed title="目录"></mt-header>
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
      lists:[]
    }
  },
  mounted() {
    this.ajaxMethod({
      method: 'get',
      url: 'http://localhost:8080/getLists',
      data: {},
    }).then(res => {
      this.lists = res
    })
  },
  methods: {
    goContent(id){
      this.$router.push({name:'about', params:{ id, total: this.lists.length }})
    }
  }
}
</script>

<style scoped>
  .list-container{
    margin-top: 35px;
  }
</style>
