<template lang="pug">
	.category-edit
		.page-subtitle
			h4 Редактировать
		form
			.input-field
				select(ref='select')
					option(
						v-for='c of categories'
						:key='c.id'
						:value='c.id'
					) {{ c.title }}
				label Выберите категорию
			.input-field
				input#name(
					type='text'
					v-model='title'
					:class='{invalid: $v.title.$dirty && !$v.title.required}'
				)
				label(for='name') Название
				span.helper-text.invalid(
					v-if='$v.title.$dirty && !$v.title.required'
				) Введите название категории
			.input-field
				input#limit(
					type='number'
					v-model.number='limit'
					:class='{invalid: $v.limit.$dirty && !$v.limit.minValue}'
				)
				label(for='limit') Лимит
				span.helper-text.invalid(
					v-if='$v.limit.$dirty && !$v.limit.minValue'
				) Минимальная величина {{this.$v.limit.$params.minValue.min}}
			button.btn.waves-effect.waves-light(type='submit') Обновить
				i.material-icons.right send
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
	name: 'categoryEdit',
	props: ['categories'],
	data: () => ({
		select: null,
	}),
	mounted() {
		this.select = M.FormSelect.init(this.$refs.select, {});
	},
	destroyed() {
		if(this.select && this.select) {
			this.select.destroy();
		}
	},
}
</script>
