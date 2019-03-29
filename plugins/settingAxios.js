import axios from 'axios';
const cookieparser = process.server ? require('cookieparser') : undefined;

export default ({store}) => {
    axios.defaults.baseURL = 'http://localhost:3000';
    if(store.state.authAdmin != null){
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.authAdmin}` ;
    }

}

