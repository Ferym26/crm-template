<template lang="pug">
	.app-main-layout
		
		Navbar(
			@navClick='isOpen = !isOpen'
		)

		Sidebar(
			v-model='isOpen'
		)
		
		main.app-content(
			:class='{full: !isOpen}'
		)
			.app-page
				router-view

		.fixed-action-btn
			router-link.btn-floating.btn-large.blue(to='/record')
				i.large.material-icons add
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
export default {
	name: 'main-layout',
	components: {
		Navbar, Sidebar
	},
	data: () => ({
		isOpen: true
	}),
	mounted() {
		this.$store.dispatch('getUserFB');
	}
}
</script>
