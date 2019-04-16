<template>
    <div>
        <b-row>
            <b-col col lg="4">
                <b-form>
                    <b-form-group label="Name">
                        <b-form-input size="sm" v-model="formAddTerm.name"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Slug">
                        <b-form-input size="sm" v-model="formAddTerm.slug"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Parent">
                        <b-form-select size="sm" v-model="formAddTerm.parentId" :options="parentTerms">

                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Description">
                        <b-form-textarea size="sm" v-model="formAddTerm.description"></b-form-textarea>
                    </b-form-group>
                    <b-button type="button" @click="submitTerms()" size="sm" variant="primary">Add new category</b-button>
                </b-form>
            </b-col>
            <b-col col lg=8>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th width="20"></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Slug</th>
                            <th>Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(term, index) in listTerms" >
                            <tr :key="index">
                                <td></td>
                                <td>{{ term.name }}</td>
                                <td>{{ term.description }}</td>
                                <td>{{ term.slug }}</td>
                                <td>1</td>
                            </tr>
                            <ChildTerm :key="index" :parentId="term._id"></ChildTerm>
                        </template>
                        
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import axios from 'axios';
import ChildTerm from './ChildTerm';
function getTermsData(idterm){
    return axios.get(`/api/admin/metaterms/getterms/${idterm}`)
}
export default {
    layout: 'admin',
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        var termdata = await getTermsData(params.id);
        var optionParentTerm = [{value : '0', text: '--parent--'}];
        termdata.data.forEach(element => {
            optionParentTerm.push({ value : element._id, text : element.name });
        });
        return { 
            listTerms : termdata.data,
            parentTerms :  optionParentTerm
        }
    },
    components : {ChildTerm},
    data() {
        return {
            formAddTerm : {
                name : '',
                parentId : '0',
                slug: '',
                description : '',
                termId : this.$route.params.id
            }    
        }
    },
    methods: {
        submitTerms(){
            let vm = this;
            axios.post('/api/admin/metaterms/addnew', { arg : this.formAddTerm }).then((res) => {
                getTermsData(vm.$route.params.id).then((rs) => {
                    vm.listTerms = rs.data;
                });
            });
        }
    }
}
</script>