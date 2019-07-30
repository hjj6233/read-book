<template>
    <div id="searchContainer">
			<input type="text" placeholder="请输入搜索内容">
			<mt-button type="primary">搜索</mt-button>
    </div>
</template>
<script>
export default {
    name: 'search',
    data() {
			return {
				value: '',
				result: ''
			}
    }
}
</script>
<style scoped>

</style>

