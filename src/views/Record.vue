<template lang="pug">
	div
		.page-title
			h3 Новая запись

		Loader(v-if='loading')

		p.center(v-else-if='!categories.length') Категорий пока нет 
			router-link(to='categories') Добавить новую категорию
		
		form.form(
				v-else
				@submit.prevent='submitHandler'
			)
			.input-field
				select(ref='select' v-model='category')
					option(
						v-for='c of categories'
						:key='c.id'
						:value='c.id'
					) {{ c.title }}
				label Выберите категорию
			p
				label
					input.with-gap(
						name='type', 
						type='radio', 
						value='income'
						v-model='type'
					)
					span Доход
			p
				label
					input.with-gap(
						name='type', 
						type='radio', 
						value='outcome'
						v-model='type'
					)
					span Расход
			.input-field
				input#amount(
					type='number'
					v-model.number='amount'
					:class='{invalid: $v.amount.$dirty && !$v.amount.required}'
				)
				label(for='amount') Сумма
				span.helper-text.invalid(
					v-if='$v.amount.$dirty && !$v.amount.minValue'
				) Минимальная величина {{this.$v.amount.$params.minValue.min}}
			.input-field
				input#description(
					type='text'
					v-model='description'
					:class='{invalid: $v.description.$dirty && !$v.description.required}'
				)
				label(for='description') Описание
				span.helper-text.invalid(
					v-if='$v.description.$dirty && !$v.description.required'
				) Введите описание
			button.btn.waves-effect.waves-light(type='submit') Создать
				i.material-icons.right send


</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';
export default {
	name: 'record',
	data: () => ({
		loading: true,
		select: null,
		categories: [],
		category: null,
		type: 'outcome',
		amount: 1,
		description: '',
	}),
	async mounted() {
		this.categories = await this.$store.dispatch('fetchCategories');
		this.loading = false;
		if (this.categories.length) {
			this.category = this.categories[0].id;
		}
		setTimeout(() => {
			this.select = M.FormSelect.init(this.$refs.select);
			M.updateTextFields();
		}, 0)
	},
	methods: {
		async submitHandler() {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			try {
				const categoryData = {
					
				}
				await this.$store.dispatch('updateCategory', categoryData);
				this.$message('Категория успешно обновлена');
				this.$emit('updated', categoryData)
			} catch (e) {}
		}
	},
	destroyed() {
		if(this.select && this.select) {
			this.select.destroy();
		}
	},
	validations: {
		amount: {minValue: minValue(1)},
		description: {required},
	},
}
</script>
