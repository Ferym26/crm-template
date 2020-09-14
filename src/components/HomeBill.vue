<template lang="pug">
	.card.light-blue.bill-card
		.card-content.white-text
			span.card-title Счет в валюте
			p.currency-line(
				v-for='cur of currencies'
				:key='cur'
			)
				span {{ getCurrency(cur) | currency(cur) }}
</template>

<script>
export default {
	props: ['rates'],
	data: () => ({
		currencies: ['RUB', 'USD', 'EUR'],
	}),
	computed: {
		base() {
			return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
		}
	},
	methods: {
		getCurrency(currency) {
			return Math.floor(this.base * this.rates[currency]);
		}
	}
}
</script>
