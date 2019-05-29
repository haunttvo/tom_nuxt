<template>
    <div>
        <button @click="SyncKivoet()" class="btn btn-info">Sync</button>
        <!--<pre>{{ dataProduct }}</pre>-->
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
                vm.dataProduct = res.data;
            });
        },
        SyncKivoet(){
            let vm =this;
            axios.post('/api/admin/kioviet/sync', { data: vm.dataProduct }).then(res => {
                console.log(res);
            });
        }
    },
    mounted() {
        this.getAccessToken();
    },
}
</script>

