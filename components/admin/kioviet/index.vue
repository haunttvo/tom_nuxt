<template>
    <div>
        <pre>{{dataProduct  }}</pre>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
      return{
          dataProduct : []
      }
    },
    methods: {
        getAccessToken(){
            let vm = this;
            axios.get('/api/admin/kioviet/getproducts').then(res => {
                vm.dataProduct = JSON.parse(res.data);
            });
        }
    },
    mounted() {
        this.getAccessToken();
    },
}
</script>

