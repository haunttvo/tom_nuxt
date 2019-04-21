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
                    <!--<no-ssr>-->
                        <!--<notifications group="foo" />-->
                    <!--</no-ssr>-->


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
                    <tbody class="display_list_posts">
                        <template v-for="(term, index) in listTerms" >
                            <tr :key="`item${index}`">
                                <td></td>
                                <td class="title">
                                    <p class="mb-0">{{ term.text }}</p>
                                    <div class="methods">
                                        <span><n-link :to="`/admin/posts/`">Edit</n-link></span> |
                                        <span class="text-danger cursor-pointer" @click="deleteTerm(term.value)">Delete</span>
                                    </div>
                                </td>
                                <td>{{ term.description }}</td>
                                <td>{{ term.slug }}</td>
                                <td></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import axios from 'axios';
import arrayToTree from 'array-to-tree';
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
function convertArrOneLevel(tree){
    return tree.reduce(function(acc, o) {
        acc.push({ value : o._id, text : bfDirecText(o.ancestors.length) + o.name, ancestors : o.ancestors, description: o.description, slug : o.slug });
        if(o.children && o.children.length > 0)
            acc = acc.concat(convertArrOneLevel(o.children));
        return acc;
    }, []);
}
export default {
    layout: 'admin',
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        var termdata = await getTermsData(params.id);
        var termArr = arrayToTree(termdata.data, { parentProperty : 'parent', customID: '_id' });
        var optionParentTerm = [{value : null, text: '— parent —', ancestors : []}];
        var chilTermTerm = convertArrOneLevel(termArr);
        return { 
            listTerms : chilTermTerm,
            parentTerms :  optionParentTerm.concat(chilTermTerm),
        }
    },
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
            alert(123);
            // axios.post('/api/admin/metaterms/addnew', { arg : this.formAddTerm }).then((res) => {
            //     getTermsData(vm.$route.params.id).then((rs) => {
            //         window.location.reload(true);
            //         // return vm.$router.push(`/admin/posts/${vm.$route.params.cpt}/taxonomy/${vm.$route.params.id}`);
            //         // var resTermsRequest = convertArrOneLevel(arrayToTree(rs.data, { parentProperty : 'parent', customID: '_id' }))
            //         // vm.listTerms = resTermsRequest;
            //         // vm.parentTerms = [{value : null, text: '— parent —', ancestors : []}].concat(resTermsRequest);
            //     });
            // });
        },
        pushAncestorsData(evt){
            var item = this.parentTerms.filter((e) => {
                return e.value === evt;
            });
            this.formAddTerm.ancestors = item[0].ancestors.concat([evt]);
        },
        deleteTerm(idTerm){
            let confirmDel = confirm('Are you sure delete term');
            if(confirmDel){
                axios.delete(`/api/admin/metaterms/delete/${idTerm}`).then((rs) => {
                    window.location.reload(true);
                });
            }
        }
    },
    mounted() {
        
    }
}
</script>
