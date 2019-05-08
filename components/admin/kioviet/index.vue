<template>
    <div>
        <h2>trang kioviet</h2>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
    methods: {
        getAccessToken(){
            if(!Cookies.get('tokenKioviet')){
                axios.get('/api/admin/kioviet/accessToken').then(res => {
                    Cookies.set('tokenKioviet', res.data);
                });
            }else{
                axios.get('https://public.kiotapi.com/products').then(res => {
                    console.log(res);
                });
            }
            // console.log();
        }
    },
    mounted() {
        this.getAccessToken();
    },
}
</script>

