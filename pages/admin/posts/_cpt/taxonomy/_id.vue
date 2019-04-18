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
                        <b-form-select size="sm" @change="pushAncestorsData" v-model="formAddTerm.parent" :options="parentTerms">

                        </b-form-select>
                        <!-- <select v-model="formAddTerm.parentId" name="" id="" class="form-control form-control-sm">
                            <template v-for="(item, index) in parentTerms">
                                <option @change="pushAncestorsData" :key="index" :value="item.value">{{ item.text }}</option>
                            </template>
                        </select> -->
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
                            <tr :key="`item${index}`">
                                <td></td>
                                <td>{{ term.name }}</td>
                                <td>{{ term.description }}</td>
                                <td>{{ term.slug }}</td>
                                <td></td>
                            </tr>
                            <template v-if="term.children.length > 0">
                                <tr v-for="(termChild, idex) in term.children" :key="`childTerm${idex}`">
                                    <td></td>
                                    <td>{{ beforeChildDirection(termChild.ancestors.length) + ' ' + termChild.name }}</td>
                                    <td>{{ termChild.description }}</td>
                                    <td>{{ termChild.slug }}</td>
                                    <td></td>
                                </tr>
                            </template>
                            
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
function bfDirecText(num){
    var dr = '';
    for (let index = 0; index < num; index++) {
        dr = dr + '— ';
    }
    return dr;
}
export default {
    layout: 'admin',
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        var termdata = await getTermsData(params.id);
        var optionParentTerm = [{value : null, text: '— parent —', ancestors : []}];
        termdata.data.forEach(element => {
            optionParentTerm.push({ value : element._id, text : element.name, ancestors : element.ancestors });
            if(element.children.length > 0){
                element.children.forEach((e) => {
                    optionParentTerm.push({ value : e._id, text : bfDirecText(e.ancestors.length) + e.name, ancestors : e.ancestors });
                });
            }
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
                parent : null,
                ancestors : [],
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
        },
        beforeChildDirection(num){
            var dr = '';
            for (let index = 0; index < num; index++) {
                dr = dr + '— ';
            }
            return dr;
        },
        pushAncestorsData(evt){
            var item = this.parentTerms.filter((e) => {
                return e.value === evt;
            });
            this.formAddTerm.ancestors = item[0].ancestors;
            this.formAddTerm.ancestors.push(evt);
        }
    }
}
</script>