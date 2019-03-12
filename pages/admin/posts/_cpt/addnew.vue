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
                    <b-button variant="info" @click="publishpost()" size="sm">Publish</b-button>
                </b-form>
            </b-col>
            <b-col md="3">
                form right
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
// import 'vue-form-generator/dist/vfg.css'
import axios from 'axios'
import { field_ex } from  './fields.js'
Vue.use(VueFormGenerator)
export default {
    layout: 'admin',
    fetch ({ store, params }) {
    //    console.log("params:", params);
    },
    async asyncData({params}) {
        let fieldAcf = await axios.get(`/api/admin/acf/getAcfPost/${params.cpt}`);
        return { acfField : fieldAcf.data }
    },
    data(){
        return{
            model: {},
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
        publishpost(){
            let self = this;
            axios.post('/api/admin/posts/addnew', {arg: this.argsFormPosts} ).then((res) => {
                let residPost = res.data._id;
                Object.keys(self.model).forEach((key) => {
                    let arg = {
                        key: key,
                        value : self.model[key],
                        postid : residPost
                    }
                    if( self.model[key] != '' ){
                        axios.post('/api/admin/meta/addnew', { arg: arg }).then((res) => {
                            console.log(res);
                        });
                    }
                });
            })
        }
    },
    created(){
        var self = this;
        for (let index = 0; index < this.acfField.length; index++) {
            self.acfField[index].field.fieldAcf.forEach((e) => {
                self.model = Object.assign({},self.model, { [e.formAcf.name] : ''} ); 
                switch (e.formAcf.type) {
                    case 'input':
                        self.schema.fields.push( field_ex.fd_text(e.formAcf).fs );
                        break;
                    case 'select':
                        self.schema.fields.push( field_ex.fd_select(e.formAcf).fs );
                        break;
                    default:
                        break;
                }
            })
        };
    }

}
</script>
