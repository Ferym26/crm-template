<template lang="pug">
	.card.orange.darken-3.bill-card
		.card-content.white-text
			.card-header
				span.card-title Курс валют
			table
				thead
					tr
						th Валюта
						th Курс
						th Дата
				tbody
					tr(v-for='cur of currencies' :key='cur')
						td {{ cur }}
						td {{ rates[cur].toFixed(2) }}
						td {{ date }}
</template>

<script>
export default {
	props: ['rates', 'date'],
	data: () => ({
		currencies: ['RUB', 'USD', 'EUR'],
	}),
}
</script>
