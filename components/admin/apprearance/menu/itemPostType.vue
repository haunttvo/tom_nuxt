<template>
    <div>
        <b-card no-body class="rounded-0">
            <b-tabs card>
            <b-tab title="Tab 1" active>
                <b-card-text>Tab Contents 1</b-card-text>
            </b-tab>
            <b-tab title="Tab 2">
                <b-card-text>Tab Contents 2</b-card-text>
            </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props:{
        posttype : {
            default : ''
        }
    },
    methods : {
        async GetListPost(){
            let ListPost = await axios.get(`/api/admin/posts/listpostcpt/page`);
            return ListPost;
        }
    },
    data(){
        return{
            listpost : []
        }
    },
    created(){
        var vm = this;
        this.GetListPost().then((res) => {
            vm.listpost = res.data;
        })
    }
}
</script>