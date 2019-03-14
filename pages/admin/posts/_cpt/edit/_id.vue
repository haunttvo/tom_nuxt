<template>
    <div>
        <b-row v-if="loadDatField">
            <b-col md="9">
                <b-form>
                    <b-form-group label="Title" label-for="postTitle">
                        <b-form-input id="postTitle" type="text" autocomplete="off" placeholder="Enter title" v-model="argsFormPosts.title"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Content" label-for="postContent">
                        <b-form-textarea autocomplete="off" id="postContent" v-model="argsFormPosts.content" />
                    </b-form-group>
                    <draggable :list="arrFormGenerator" group="people">    
                        <template v-for="(form, i) in arrFormGenerator" >
                            <div :key="i" class="df-acf">
                                <div class="box-header-field cursor-pointer" :href="'#collapseExample' + i" data-toggle="collapse">{{ form.nameAcf }}<i class="fas fa-caret-up float-right fd-down-acf"></i></div>
                                <div class="collapse show" :id="'collapseExample' + i">
                                    <div class="card card-body">
                                        <vue-form-generator  :schema="form.schema" :model="form.model"></vue-form-generator>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>    
                    <!-- <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator> -->
                    <b-button variant="info" @click="updatepost()" size="sm">Update</b-button>
                </b-form>
            </b-col>
            <b-col md="3">
                <label for="">Form right</label>
                <draggable :list="arrFormGeneratorCol2" group="people">
                    <template v-for="(form, i) in arrFormGeneratorCol2" >
                            <div :key="i" class="df-acf">
                                <div class="box-header-field cursor-pointer" :href="'#collapseExample1' + i" data-toggle="collapse">{{ form.nameAcf }}<i class="fas fa-caret-up float-right fd-down-acf"></i></div>
                                <div class="collapse show" :id="'collapseExample1' + i">
                                    <div class="card card-body">
                                        <vue-form-generator  :schema="form.schema" :model="form.model"></vue-form-generator>
                                    </div>
                                </div>
                            </div>
                        </template>
                </draggable>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import axios from 'axios'
import draggable from 'vuedraggable'
import { field_ex } from  '../fields.js'
Vue.use(VueFormGenerator)
export default {
    layout: 'admin',
    components:{
        draggable
    },
    async asyncData({params}){
        let detailpost = await axios.get(`/api/admin/posts/detailpost/${params.id}`);
        let fieldAcfLeft = await axios.get(`/api/admin/acf/getAcfPost/${params.cpt}/left`);
        let fieldAcfRight = await axios.get(`/api/admin/acf/getAcfPost/${params.cpt}/right`);
        return  { 
            detailpost: detailpost.data, 
            acfField : fieldAcfLeft.data, 
            acfFieldRight : fieldAcfRight.data,
            model : {},
            argsFormPosts :  detailpost.data.context,
            loadDatField: false
        }
    },
    data(){
        return{
            arrFormGeneratorCol2 : [],
            arrFormGenerator : [],
            argsFormPosts: {
                title : '',
                content: '',
                posttype : this.$route.params.cpt
            },
            schema: {
                fields: [
                    // {
                    //     type: 'input',
                    //     inputType: 'text',
                    //     label: 'ID (disabled text field)',
                    //     model: 'id',
                    //     readonly: true,
                    //     disabled: true
                    // },
                    // {
                    //     type: 'input',
                    //     inputType: 'text',
                    //     label: 'Name',
                    //     model: 'name',
                    //     placeholder: 'Your name',
                    //     featured: true,
                    //     required: true
                    // },
                    // {
                    //     type: 'input',
                    //     inputType: 'password',
                    //     label: 'Password',
                    //     model: 'password',
                    //     min: 6,
                    //     required: true,
                    //     hint: 'Minimum 6 characters',
                    //     validator: VueFormGenerator.validators.string
                    // },
                    // {
                    //     type: 'select',
                    //     label: 'Skills',
                    //     model: 'skills',
                    //     values: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
                    // },
                    // {
                    //     type: 'input',
                    //     inputType: 'email',
                    //     label: 'E-mail',
                    //     model: 'email',
                    //     placeholder: 'User\'s e-mail address'
                    // },
                    // {
                    //     type: 'checkbox',
                    //     label: 'Status',
                    //     model: 'status',
                    //     default: true
                    // }
                ]
            },
            formOptions: {
                validateAfterLoad: true,
                validateAfterChanged: true,
                validateAsync: true
            }
        }
    },
    methods:{
        updatepost(){
            var vm = this;
            axios.put('/api/admin/posts/updatePost',{arg : this.argsFormPosts, id : this.$route.params.id}).then((res) => {
                vm.arrFormGenerator.concat(vm.arrFormGeneratorCol2).forEach((field) => {
                    Object.keys(field.model).forEach((e) => {
                        let arg = {
                            key: e,
                            value : field.model[e],
                        };
                        if(field.model[e] != ''){
                            axios.put('/api/admin/meta/update', { arg : arg, postid : vm.$route.params.id }).then((res) => {
                                this.$router.push(`/admin/posts/${this.$route.params.cpt}`);
                                // console.log(res);
                            });
                        }
                    });
                });
            });
        },
        async resInput(){
            var vm = this;
            this.arrFormGenerator.concat(vm.arrFormGeneratorCol2).forEach((v, index) => {
                v.fd.forEach((i) => {
                    v.model = Object.assign({}, v.model, { [i.formAcf.name] : '' }) ;
                    axios.post(`/api/admin/meta/getmeta`,{ arg : { postid : vm.$route.params.id, key : [i.formAcf.name] } }).then((res) => {
                        if(res.data[0]) v.model[i.formAcf.name] = res.data[0].value;
                    });
                    switch (i.formAcf.type) {
                        case 'input':
                            v.schema.fields.push( field_ex.fd_text(i.formAcf).fs );
                            break;
                        case 'select':
                            v.schema.fields.push( field_ex.fd_select(i.formAcf).fs );
                            break;
                        default:
                            break;
                    }
                }); 
            });
        }
    },
    created(){
        var vm = this;
        this.acfField.forEach((field) => {
                vm.arrFormGenerator.push({fd: field.field.fieldAcf, nameAcf : field.field.nameField, model : {}, schema : { fields: [] } });
        });
        this.acfFieldRight.forEach((field) => {
                vm.arrFormGeneratorCol2.push({fd: field.field.fieldAcf, nameAcf : field.field.nameField, model : {}, schema : { fields: [] } });
        });
        this.resInput().then(_ => {
            this.loadDatField = true;
        })
    }
}
</script>

