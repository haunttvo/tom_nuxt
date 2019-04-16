<template>
    <tr>
        <td></td>
        <td>dấd</td>
        <td>ádasd</td>
        <td>ádasd</td>
        <td>âsdasdas</td>
    </tr>
</template>
<script>
import axios from 'axios';
export default {
    props : {
        parentId : {
            type: String
        }
    },
    data(){
        return{
            arrChildTerms: []
        }
    },
    methods: {
        getChildTerm(){
            let vm = this;
            axios.get(`/api/admin/metaterms/termchildren/${this.parentId}`).then((rs) => {
                vm.arrChildTerms = rs.data;
            });
        }
    },
    created() {
        this.getChildTerm();
    },
}
</script>