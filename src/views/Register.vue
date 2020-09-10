<template lang="pug">
	form.card.auth-card(
		@submit.prevent="submitHandler"
	)
		.card-content
			span.card-title Домашняя бухгалтерия
			.input-field
				input#name(
					type='text'
					v-model.trim='name'
					:class='{invalid: ($v.name.$dirty && !$v.name.required)}'
				)
				label(for='name') Имя
				small.helper-text.invalid(
					v-if='$v.name.$dirty && !$v.name.required'
				) Введите ваше имя
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
			div
				label
					input(
						type='checkbox'
						v-model='agree'
					)
					span С правилами согласен
		.card-action
			div
				button.btn.waves-effect.waves-light.auth-submit(type='submit') Зарегистрироваться
					i.material-icons.right send
			p.center Уже есть аккаунт? &nbsp;
				router-link(to='/login') Войти!
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators';
export default {
	name: 'register',
	data: () => ({
		name: '',
		email: '',
		password: '',
		agree: false,
	}),
	validations: {
		name: {required},
		email: {email, required},
		password: {minLength: minLength(6), required},
		agree: {checked: v => v},
	},
	methods: {
		submitHandler() {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			const formData = {
				name: this.name,
				email: this.email,
				password: this.password,
			}
			console.log(formData);
			this.$router.push('/');
		}
	}
}
</script>
