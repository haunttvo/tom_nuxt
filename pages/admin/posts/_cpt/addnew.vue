<template>
    <div>
        <h2>trang them moi</h2>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    layout: 'admin',
    fetch ({ store, params }) {
    //    console.log("params:", params);
    },
    async asyncData({params}) {
        let fieldAcf = await axios.get(`http://localhost:3000/api/admin/acf/getAcfPost/${params.cpt}`);
        return { acfField : fieldAcf.data }
    },

}
</script>
