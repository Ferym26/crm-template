<template lang="pug">
	form.card.auth-card(
		@submit.prevent="submitHandler"
	)
		.card-content
			span.card-title Домашняя бухгалтерия
			.input-field
				input#email(
					type='text'
					v-model.trim='email'
					:class='{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}'
				)
				label(for='email') Email
				small.helper-text.invalid(
					v-if='$v.email.$dirty && !$v.email.required'
				) Поле не должно быть пустым
				small.helper-text.invalid(
					v-else-if='$v.email.$dirty && !$v.email.email'
				) Введите корректрый Email
			.input-field
				input#password(
					type='password' 
					v-model.trim='password'
					:class='{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}'
				)
				label(for='password') Пароль
				small.helper-text.invalid(
					v-if='$v.password.$dirty && !$v.password.required'
				) Введите пароль
				small.helper-text.invalid(
					v-else-if='$v.password.$dirty && !$v.password.minLength'
				) Пароль должен содержать более {{this.$v.password.$params.minLength.min}} символов. Сейчас {{password.length}}
		.card-action
			div
				button.btn.waves-effect.waves-light.auth-submit(type='submit') Войти
					i.material-icons.right send
			p.center Нет аккаунта? &nbsp;
				router-link(to='/register') Зарегистрироваться
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators';
import messages from '@/utils/messages';
export default {
	name: 'login',
	data: () => ({
		email: '',
		password: '',
	}),
	validations: {
		email: {email, required},
		password: {minLength: minLength(6), required},
	},
	mounted() {
		if (messages[this.$route.query.message]) {
			this.$message(messages[this.$route.query.message])
		}
	},
	methods: {
		async submitHandler() {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			const formData = {
				email: this.email,
				password: this.password,
			}
			try {
				await this.$store.dispatch('login', formData);
				this.$router.push('/');
			}
			catch(e) {
				// console.log(e);
			}	
		}
	}
}
</script>
