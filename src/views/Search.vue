<template>
    <div id="searchContainer">
			<form action="" target="frameFile" onsubmit="return false;">
				<mt-search
					v-model="value"
					@keyup.enter.native="search"
				>
					<mt-cell
						v-for="item in result"
						:key="item.id"
						:title="item.title"
						:value="item.author"
						is-link
						@click.native="goCatalogue(item)"
					>
					</mt-cell>
				</mt-search>
			</form>
			<iframe name='frameFile' style="display: none;"></iframe>
    </div>
</template>
<script>
export default {
    name: 'search',
    data() {
			return {
				value: '',
				result: []
			}
		},
		mounted() {
			
		},
		methods: {
			goCatalogue(item) {
				this.$router.push({name:'list', params:{ url:item.url, title:item.title }})      
			},
			search() {
				this.result = []
				this.ajaxMethod({
					method: 'get',
					url: '/search',
					data: { name: this.value },
				}).then(res => {
					this.result = res
				})
			}
		},
		watch:{
			value: function(val) {
				if(!val) this.result = []
			}
		}
}
</script>
<style scoped>
	.btn-normal {
		padding: 6px 10px;
	}
	
</style>

