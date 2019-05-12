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
            // axios.get('/api/admin/kioviet/accessToken').then(res => {
            //     Cookies.set('tokenKioviet', res.data);
            // });
            axios.get('/api/admin/kioviet/getproducts').then(res => {
                console.log(res);
            });

            // console.log();
        }
    },
    mounted() {
        this.getAccessToken();
    },
}
</script>

