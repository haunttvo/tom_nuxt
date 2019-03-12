<template>
    <div>
        <b-row>
            <b-col md="9">
                <b-form>
                    <b-form-group label="Title" label-for="postTitle">
                        <b-form-input id="postTitle" type="text" autocomplete="off" placeholder="Enter title" v-model="argsFormPosts.title"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Content" label-for="postContent">
                        <b-form-textarea autocomplete="off" id="postContent" v-model="argsFormPosts.content" />
                    </b-form-group>
                    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
                    <b-button variant="info" @click="updatepost()" size="sm">Update</b-button>
                </b-form>
            </b-col>
            <b-col md="3">
                form right
                {{ model.gioithieu }}
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import axios from 'axios'
import { field_ex } from  '../fields.js'
Vue.use(VueFormGenerator)
export default {
    layout: 'admin',
    async asyncData({params}){
        let detailpost = await axios.get(`/api/admin/posts/detailpost/${params.id}`);
        let fieldAcf = await axios.get(`/api/admin/acf/getAcfPost/${params.cpt}`);
        return  { 
            detailpost: detailpost.data, 
            acfField : fieldAcf.data, 
            model : {},
            argsFormPosts :  detailpost.data.context
        }
    },
    data(){
        return{
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
                Object.keys(this.model).forEach((e) => {
                    // console.log(vm.model[e]);
                    let arg = {
                        key: e,
                        value : vm.model[e],
                    };
                    if(vm.model[e] != ''){
                        axios.put('/api/admin/meta/update', { arg : arg, postid : vm.$route.params.id }).then((res) => {
                        console.log(res);
                    });
                    }
                    
                });
            });
        }
    },
    created(){
        var vm = this;
        this.acfField.forEach((field) => {
                field.field.fieldAcf.forEach((e) => {
                vm.model = Object.assign({},vm.model, { [e.formAcf.name] : ''} ); 
                axios.post(`/api/admin/meta/getmeta`,{ arg : { id : vm.$route.params.id, key : [e.formAcf.name] } }).then((res) => {
                    if(res.data[0]) vm.model[e.formAcf.name] = res.data[0].value;
                });
                switch (e.formAcf.type) {
                    case 'input':
                        vm.schema.fields.push( field_ex.fd_text(e.formAcf).fs );
                        break;
                    case 'select':
                        vm.schema.fields.push( field_ex.fd_select(e.formAcf).fs );
                        break;
                    default:
                        break;
                }
                
            })
        });
    }
}
</script>

