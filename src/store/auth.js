import firebase from 'firebase/app'

export default {
	state: {
		user: {
			name: '',
			bill: 0,
		}
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		}
	},
	actions: {
		async login({dispatch, commit}, {email, password}) {
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password);
			}
			catch(e) {
				commit('setError', e);
				throw e;
			}
		},
		async logout() {
			await firebase.auth().signOut();
		},
		async getUserFB({dispatch, commit}) {
			const uid = await dispatch('getUid');
			await firebase.database().ref(`/users/${uid}/info`).once('value')
				.then(function(snapshot) {
					commit('setUser', snapshot.val());
				})
		},
		getUid() {
			const user = firebase.auth().currentUser;
			return user ? user.uid : null;
		},
		async register({dispatch, commit}, {email, password, name}) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(email, password);
				const uid = await dispatch('getUid');
				await firebase.database().ref(`/users/${uid}/info`).set({
					bill: 0,
					name: name,
				})
			}
			catch(e) {
				commit('setError', e);
				throw e;
			}
		},
	},
	getters: {
		getUser(state) {
			return state.user
		}
	}
};
