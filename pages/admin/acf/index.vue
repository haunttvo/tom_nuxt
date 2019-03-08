<template>
    <div id="acf-wrapper">
        <n-link to="/admin/acf/addnew">Add new field</n-link>
        <table class="table table-bordered table-list-acf">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>...</th>
                    <th>Fields</th>
                </tr>
            </thead>    
            <tbody>
                <template v-for="(itemacf, i) in listAcf">
                    <tr :key="i">
                        <td><p><b>{{ itemacf.field.nameField }}</b></p>
                            <div class="action-methods">
                                <span><n-link :to="`/admin/acf/edit/${itemacf._id}`">Edit</n-link></span> |
                                <span>Duplicate</span> |
                                <span>Delete</span>
                            </div>
                        </td>
                        <td></td>
                        <td>2</td>
                    </tr>
                </template>
                
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
export default {
    layout: 'admin',
    async asyncData({params}){
        const { data } = await axios.get('/api/admin/acf/getListAcf'); 
        return { listAcf: data }
    },
    data(){
        
    }
}
</script>
