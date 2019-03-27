import axios from 'axios';
const cookieparser = process.server ? require('cookieparser') : undefined;
export const state = () => ({
	authAdmin : null,
	listCptSidebar: []
});

export const mutations = {
	receiveCpt(state, n) {
		state.listCptSidebar = n;
	},
	setAuthAdmin(state, auth){
		state.authAdmin = auth;
	}
}
export const actions = {
	async nuxtServerInit ({commit}, {req}) {
		/** auth admin */
		let authAdmin = null;
		if(req.headers.cookie){
			const parsed = cookieparser.parse(req.headers.cookie)
			try {
				authAdmin = parsed.authAdmin
			} catch (err) {
				// No valid cookie found
			}
		}
		commit('setAuthAdmin', authAdmin)
		let dataCpt = await axios.get('/api/admin/cpt');
		commit('receiveCpt', dataCpt.data);
	}
}
