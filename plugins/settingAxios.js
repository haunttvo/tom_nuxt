import axios from 'axios';
const cookieparser = process.server ? require('cookieparser') : undefined;

export default ({store}) => {
    axios.defaults.baseURL = 'https://nuxtcms.herokuapp.com/';
    if(store.state.authAdmin != null){
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.authAdmin}` ;
    }

}

