export default function ({ $axios, store }) {
    $axios.onRequest((config) => {
        if(store.state.authAdmin){
            config.headers.common['Authorization'] = `Bearer ${store.state.authAdmin}`;
        }
    })
}