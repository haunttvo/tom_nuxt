<template>
    <div>
        <b-card no-body class="rounded-0">
            <b-tabs card>
            <b-tab title="Most used" active>
                <b-card-text>Tab Contents 1</b-card-text>
            </b-tab>
            <b-tab title="View all">
                <template v-for="(item, index) in listpost">
                    <div class="custom-control custom-checkbox" :key="index">
                        <input type="checkbox" class="custom-control-input" :id="'sl_menu_item' + index" name="example1">
                        <label class="custom-control-label" :for="'sl_menu_item' + index">{{ item.context.title }}</label>
                    </div>
                </template>
            </b-tab>
            <b-tab title="Search">
                <b-card-text></b-card-text>
            </b-tab>
            </b-tabs>
        </b-card>
        <span class="cursor-pointer"><u>Select all</u></span>
        <b-button size="sm" class="float-right">Add to menu</b-button>
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