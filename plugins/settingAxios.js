import axios from 'axios';
const cookieparser = process.server ? require('cookieparser') : undefined;

export default ({store}) => {
    axios.defaults.baseURL = 'http://localhost:3000';
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.authAdmin}` ;
}

