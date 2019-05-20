<template>
    <div>
        <pre>{{ dataProduct }}</pre>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
      return{
          dataProduct : {}
      }
    },
    methods: {
        getAccessToken(){
            let vm = this;
            axios.get('/api/admin/kioviet/getproducts').then(res => {
                // console.log(res);
                vm.dataProduct = res.data;
            });
        }
    },
    mounted() {
        this.getAccessToken();
    },
}
</script>

