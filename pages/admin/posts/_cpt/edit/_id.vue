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
            model : {} 
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
            alert(1);
        }
    },
    created(){
        
        this.model = {
            gioithieu : '',
            dientich : '',
            khuvuc : ''
        }
        var vm = this;
        this.acfField.forEach((field) => {
                field.field.fieldAcf.forEach((e) => {

                   
                axios.post(`/api/admin/meta/getmeta`,{ arg : { id : '5c8721535af47606f84c8ead', key : [e.formAcf.name] } }).then((res) => {
                    if(res.data[0]) vm.model.gioithieu = res.data[0].value;
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
        // console.log(vm.model);
        // for (let index = 0; index < this.acfField.length; index++) {
        //     this.acfField[index].field.fieldAcf.forEach((e) => {
        //         // self.model = Object.assign(self.model, { [e.formAcf.name] : ''} ); 
        //         self.model[e.formAcf.name] = '';
        //         // axios.post(`/api/admin/meta/getmeta`,{ arg : { id : '5c8721535af47606f84c8ead', key : [e.formAcf.name] } }).then((res) => {
        //         //     if(res.data[0]) self.model[e.formAcf.name] = res.data[0].value;
        //         // });
        //         switch (e.formAcf.type) {
        //             case 'input':
        //                 self.schema.fields.push( field_ex.fd_text(e.formAcf).fs );
        //                 break;
        //             case 'select':
        //                 self.schema.fields.push( field_ex.fd_select(e.formAcf).fs );
        //                 break;
        //             default:
        //                 break;
        //         }
                
        //     })
        // };
        // Object.keys(this.model).forEach((a) => {
        //     axios.post(`/api/admin/meta/getmeta`,{ arg : { id : '5c8721535af47606f84c8ead', key : a } }).then((res) => {
        //         self.model.gioithieu = '123213123213';
        //         if(res.data[0]) self.model[a] = res.data[0].value;
        //     });
        // });
        // console.log(this.model);
        // this.model.gioithieu = '213213213';
    }
}
</script>

