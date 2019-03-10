import axios from 'axios';

export const state = () => ({
	listCptSidebar: []
});

export const mutations = {
	receiveCpt(state, n) {
		state.listCptSidebar = n;
	},
}
export const actions = {
	async nuxtServerInit ({commit}) {
		let dataCpt = await axios.get('http://localhost:3000/api/admin/cpt');
		commit('receiveCpt', dataCpt.data);		
	}
}
