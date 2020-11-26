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
						v-if='categories.length'
						:categories='this.categories'
						:key='categories.length + updateCount'
						@updated='updateCategories'
					)
					p(v-else class='center') Нет созданных категорий

</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
	name: 'categories',
	data: () => ({
		categories: [],
		loading: true,
		updateCount: 0,
	}),
	methods: {
		addNewCategory(category) {
			this.categories.push(category);
		},
		updateCategories(category) {
			const idx = this.categories.findIndex(c => c.id === category.id);
			this.categories[idx].title = category.title;
			this.categories[idx].limit = category.limit;
			this.updateCount++
		},
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
