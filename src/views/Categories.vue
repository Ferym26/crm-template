<template lang="pug">
	div
		.page-title
			h3 Категории
		section
			Loader(
				v-if='loading'
			)
			.row(v-else)
				.col.s12.m6
					CategoryCreate(
						@created='addNewCategory'
					)
				
				.col.s12.m6
					CategoryEdit(
						:categories='this.categories'
					)

</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
	name: 'categories',
	data: () => ({
		categories: [],
		loading: true,
	}),
	methods: {
		addNewCategory(category) {
			this.categories.push(category);
			console.log(this.categories);
		}
	},
	async mounted() {
		this.categories = await this.$store.dispatch('fetchCategories');
		this.loading = false;
	},
	components: {
		CategoryCreate, CategoryEdit
	}
}
</script>
