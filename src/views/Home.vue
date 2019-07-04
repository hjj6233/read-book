<template>
  <div class="home">
    hello world
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {

    }
  },
  mounted() {
    this.ajaxMethod({
      method: 'get',
      url: 'http://localhost:8080/getMsg',
      data: {},
    }).then(res => {
      console.log(res)
    })
  },
  methods: {
    
  }
  
}
</script>
