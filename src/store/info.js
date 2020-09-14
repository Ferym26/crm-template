import firebase from 'firebase/app'

export default {
	state: {
		info: {}
	},
	mutations: {
		setInfo(state, info) {
			state.info = info;
		},
		clearInfo(state) {
			state.info = {};
		}
	},
	actions: {
		async getUserFB({dispatch, commit}) {
			try {
				const uid = await dispatch('getUid');
				await firebase.database().ref(`/users/${uid}/info`).once('value')
					.then(function(snapshot) {
						commit('setInfo', snapshot.val());
					})
			}
			catch (e) {
				
			}
		},
	},
	getters: {
		info(state) {
			return state.info
		}
	}
}
