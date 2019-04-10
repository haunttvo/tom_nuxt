<template>
    <div>
        <b-form>
            <b-form-group label="Name">
                <b-form-input size="sm" v-model="argTerms.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Slug" >
                <b-form-input size="sm" v-model="argTerms.slug"></b-form-input>
            </b-form-group>
            <b-form-group label="Post Type">
                <b-form-select size="sm" :options="optionCpt" v-model="argTerms.postType"></b-form-select>
            </b-form-group>
            <b-button @click="addnewTerms()">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    layout : 'admin',
    async asyncData() {
        let cpt = await axios.get('/api/admin/cpt');
        let selectCpt = [];
        cpt.data.forEach((e) => {
            selectCpt.push({value : e.slug, text: e.name});
        });
        return {optionCpt : selectCpt}
    },
    data(){
        return{
            argTerms: {
                name : '',
                slug : '',
                postType : ''
            }
        }
    },
    methods:{
        addnewTerms(){
            axios.post('/api/admin/terms/addnew', {arg : this.argTerms}).then((result) => {
                console.log(result);
            });
        }
    }
}
</script>
