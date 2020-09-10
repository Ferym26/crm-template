import Vue from "vue";
import App from "./App.vue";
import Vuelidate from 'vuelidate';
import router from "./router";
import store from "./store";
import dateFilter from '@/filters/date.filter';
import messagePlugin from '@/utils/message.plugin';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter);

firebase.initializeApp({
	apiKey: "AIzaSyAO3xB693JHBIrAC5QgFzTMd8QsAzum4fQ",
	authDomain: "crm-template-fdbf9.firebaseapp.com",
	databaseURL: "https://crm-template-fdbf9.firebaseio.com",
	projectId: "crm-template-fdbf9",
	storageBucket: "crm-template-fdbf9.appspot.com",
	messagingSenderId: "853482975504",
	appId: "1:853482975504:web:8e47e27f9ffbb25b3b7595"
});

let app;
firebase.auth().onAuthStateChanged(() => {
	if (app) return false;
	app = new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount("#app");
});
