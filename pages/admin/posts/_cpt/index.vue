<template>
    <div>
        <table class="table table-bordered">
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, i) in listpost" :key="i">
                <td>{{ post._id }}</td>
                <td>{{ post.context.title }}</td>
                <td>
                    <n-link :to="`/admin/posts/${$route.params.cpt}/edit/${post._id}`">Edit</n-link>
                    <button class="btn btn-danger btn-sm">Delete</button>
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
    async asyncData({params}){
        let { data } = await axios.get(`/api/admin/posts/listpostcpt/${params.cpt}`);
        return { listpost: data }
    },
    data(){
        return{

        }
    }
}
</script>