<template>
    <div>
        <table class="table table-bordered">
        <thead>
            <tr>
                <th width="25">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="checkAll" @change="selectAll()" v-model="allSelected">
                        <label class="custom-control-label" for="checkAll"></label>
                    </div>
                </th>
                <th>Title</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody class="display_list_posts">
            <tr v-for="(post, i) in listpost" :key="i">
                <td>
                    <b-checkbox :value="post._id" v-model="idSelected"></b-checkbox>
                </td>
                <td class="title">
                    <p class="mb-0">{{ post.context.title }}</p>
                    <div class="methods">
                        <span><n-link :to="`/admin/posts/${$route.params.cpt}/edit/${post._id}`">Edit</n-link></span> | 
                        <span class="text-danger" @click="deletePost(post._id)">Delete</span>
                    </div>
                    
                </td>
                <td></td>
                <td>
                    <!-- <n-link :to="`/admin/posts/${$route.params.cpt}/edit/${post._id}`">Edit</n-link>
                    <button @click="deletePost(post._id)" class="btn btn-danger btn-sm">Delete</button> -->
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    layout: 'admin',
    async asyncData({params, $axios,store}){
        if(store.state.authAdmin){
            let { data } = await $axios.get(`/api/admin/posts/listpostcpt/${params.cpt}`);
            return { listpost: data }
        }
    },
    data(){
        return{
            idSelected: [],
            allSelected : false
        }
    },
    methods: {
        deletePost(id){
            axios.delete(`/api/admin/posts/deletePost/${id}`).then((res) => {
                console.log(res);
            });
        },
        selectAll(){
            let vm = this;
            if(!this.allSelected){
                this.idSelected = [];
            }else{
                this.listpost.forEach(element => {
                    vm.idSelected.push(element._id);
                });
            }
            
        }
    },
}
</script>

