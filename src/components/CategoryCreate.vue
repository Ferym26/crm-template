<template lang="pug">
	.category-create
		.page-subtitle
			h4 Создать
		form(
			@submit.prevent="submitHandler"
		)
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
			button.btn.waves-effect.waves-light(type='submit') Создать
				i.material-icons.right send
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
	data: () => ({
		title: '',
		limit: 100,
	}),
	validations: {
		title: {required},
		limit: {minValue: minValue(100)},
	},
	methods: {
		async submitHandler() {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			const formData = {
				title: this.title,
				limit: this.limit,
			}
			try {
				const category = await this.$store.dispatch('createCategory', formData);
				this.title = '';
				this.limit = 100;
				this.$message('Категория была создана');
				this.$emit('created', category);
				this.$v.reset();
			} catch (e) {}
		}
	},
	mounted() {
		M.updateTextFields();
	},
}
</script>
