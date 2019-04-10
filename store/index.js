import axios from 'axios';
import {after} from "vee-validate/dist/rules.esm";
const cookieparser = process.server ? require('cookieparser') : undefined;
const AfterLoginAdmin = async (commit, token) => {
	// axios.defaults.headers.common['Authorization'] = `Bearer ${token}` ;
	// await axios.get('/api/admin/cpt').then((rs) => {
	// 	var dataCpt = rs.data;
	// 	var getTerm = dataCpt.map(function(item){
	// 		return axios.get(`/api/admin/terms/findterms/${item.slug}`).then((result) => {
	// 			return item.child = result.data;
	// 		});
			
	// 	});
	// 	Promise.all(getTerm).then((result) => {
	// 		commit('receiveCpt', dataCpt);
	// 	});
		
	// }).catch((err) => {
	// 	// console.log(err);
	// });
}

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
	},
	async afterLoginSuccess(state, token){
		await AfterLoginAdmin(this.commit, token);
	}
}
export const actions = {
	async nuxtServerInit ({commit} ,{req}) {
		/** auth admin */
		var arr_url = req.url.split('/');
		if(arr_url[1] == 'admin'){
			let authAdmin = null;
			if(req.headers.cookie){
				const parsed = cookieparser.parse(req.headers.cookie)
				try {
					authAdmin = parsed.authAdmin;
				} catch (err) {
					// No valid cookie found
				}
			}
			commit('setAuthAdmin', authAdmin);
			if(arr_url[2] !== 'login'){
				await AfterLoginAdmin(commit, authAdmin);
			}
		}
	}
}
