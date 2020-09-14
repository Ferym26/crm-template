<template lang="pug">
	div
		.page-title
			h3 Счет
			button.btn.waves-effect.waves-light.btn-small(
				@click='refresh'
			)
				i.material-icons refresh
		Loader(v-if='loading')
		.row(v-else)
			.col.s12.m6.l4
				HomeBill(
					:rates='currency.rates'
				)
			.col.s12.m6.l8
				HomeCurrency(
					:rates='currency.rates'
					:date='currency.date'
				)

</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
export default {
	name: 'home',
	data: () => ({
		loading: true,
		currency: null,
	}),
	async mounted() {
		this.currency = await this.$store.dispatch('fetchCurrency');
		this.loading = false;
	},
	methods: {
		async refresh() {
			this.loading = true;
			this.currency = await this.$store.dispatch('fetchCurrency');
			this.loading = false;
		}
	},
	components: {
		HomeBill, HomeCurrency
	}
}
</script>
