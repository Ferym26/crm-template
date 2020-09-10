<template lang="pug">
	nav.navbar.orange.lighten-1
		.nav-wrapper
			.navbar-left
				a(href='#' @click.prevent='$emit("navClick")')
					i.material-icons.black-text dehaze
				span.black-text {{date | date('time')}}
			ul.right.hide-on-small-and-down
				li
					a.dropdown-trigger.black-text(
							href='#'
							data-target='dropdown'
							ref='dropdownRef'
						) USER NAME
						i.material-icons.right arrow_drop_down
					ul#dropdown.dropdown-content
						li
							router-link.black-text(to='/profile') Профиль
								i.material-icons account_circle
						li.divider(tabindex='-1')
						li
							a.black-text(
									href='#'
									@click.prevent='logout'
								) Выйти
								i.material-icons assignment_return
</template>

<script>
export default {
	data: () => ({
		date: new Date(),
		intervel: null,
		dropdown: null,
		username: 'User Name',
	}),
	methods: {
		async logout() {
			await this.$store.dispatch('logout');
			this.$router.push('/login?message=logouttext')
		}
	},
	mounted() {
		this.dropdown = window.M.Dropdown.init(this.$refs.dropdownRef, {
			constrainWidth: false,
		});
		this.interval = setInterval(() => {
			this.date = new Date();
		}, 1000);
	},
	beforeDestroy() {
		clearInterval(this.dropdown);
		if(this.dropdown && this.dropdown.destroy) {
			this.dropdown.destroy();
		}
	}
}
</script>
