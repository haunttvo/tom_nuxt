<template>
    <div>
        <b-row v-if="loadDatField">
            <b-col md="9">
                <b-form>
                    <b-form-group label="Title" label-for="postTitle">
                        <b-form-input id="postTitle" type="text" autocomplete="off" placeholder="Enter title" v-model="argsFormPosts.title"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Content" label-for="postContent">
                        <editor api-key="4zp3khtm2s5naymgl7i1eanj8uvxbe20nzuqx5e5aouoe8yi" rows="25" v-model="argsFormPosts.content" :init="{plugins: 'wordcount image code'}"></editor>
                        <!-- <b-form-textarea autocomplete="off" id="postContent" v-model="argsFormPosts.content" /> -->
                    </b-form-group>
                    <draggable :list="arrFormGenerator" group="posts_drag" @change="log">    
                        <template v-for="(form, i) in arrFormGenerator" >
                            <div :key="i" class="df-acf">
                                <div class="box-header-field cursor-pointer" :href="'#collapseExample' + i" data-toggle="collapse">{{ form.nameAcf }}<i class="fas fa-caret-up float-right fd-down-acf"></i></div>
                                <div class="collapse show" :id="'collapseExample' + i">
                                    <div class="card card-body">
                                        <vue-form-generator  :schema="form.schema" :model="form.model" :options="formOptions"></vue-form-generator>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </b-form>
            </b-col>
            <b-col md="3">
                <div class="df-acf" style="margin-top: 28px;">
                    <div class="box-header-field cursor-pointer" href="#publishpost" data-toggle="collapse">Publish<i class="fas fa-caret-up float-right fd-down-acf"></i></div>
                    <div class="collapse show" id="publishpost">
                        <div class="card card-body">
                            <div id="misc-publishing-actions">
                                <div class="misc-pub-section misc-pub-post-status">
                                    <!-- Default unchecked -->
                                    <i class="fas fa-burn"></i> STATUS
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" value="pending" v-model="argsFormPosts.attrPublish.status" id="pendingreviewpost" name="poststatus">
                                        <label class="custom-control-label" for="pendingreviewpost">Pending Review</label>
                                    </div>
                                    <!-- Default checked -->
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" value="draft" v-model="argsFormPosts.attrPublish.status" id="draftpost" name="poststatus" checked>
                                        <label class="custom-control-label" for="draftpost">Draft</label>
                                    </div>
                                    <i v-if="argsFormPosts.attrPublish.status !== ''" @click="argsFormPosts.attrPublish.status = ''" class="fas fa-times"></i>
                                </div>
                                <div class="misc-pub-section misc-pub-visibility">

                                </div>
                            </div>
                            <div class="bt-publish">
                                <b-button variant="info" @click="updatepost()" size="sm">Update</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <draggable :list="arrFormGeneratorCol2" group="posts_drag" @change="log">
                    <template v-for="(form, i) in arrFormGeneratorCol2" >
                            <div :key="i" class="df-acf">
                                <div class="box-header-field cursor-pointer" :href="'#collapseExample1' + i" data-toggle="collapse">{{ form.nameAcf }}<i class="fas fa-caret-up float-right fd-down-acf"></i></div>
                                <div class="collapse show" :id="'collapseExample1' + i">
                                    <div class="card card-body">
                                        <vue-form-generator  :schema="form.schema" :model="form.model" :options="formOptions"></vue-form-generator>
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
import { FieldArray } from 'vfg-field-array'
import { FieldObject } from 'vfg-field-object'
var ModuleLibrary = require('vfg-field-array')
import axios from 'axios'
import draggable from 'vuedraggable'
import { field_ex } from  '../fields.js'
import Editor from '@tinymce/tinymce-vue'
/** register field */
import fieldTinymce from '~/components/admin/vue-field/fieldTinymce'
import fieldImage from '~/components/admin/vue-field/fieldImage'
import fieldImageMultipe from '~/components/admin/vue-field/fieldImageMultipe'
Vue.component("fieldTinymce", fieldTinymce)
Vue.component("field-image_field", fieldImage)
Vue.component("field-image_multipe_field", fieldImageMultipe)
Vue.component('VueFormGenerator', VueFormGenerator.component)
Vue.component('FieldArray', FieldArray);
Vue.component('FieldObject', FieldObject);
export default {
    layout: 'admin',
    components:{
        draggable,
        'editor': Editor
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
            argsFormPosts :  detailpost.data.context
        }
    },
    data(){
        return{
            loadDatField : false,
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
                vm.arrFormGenerator.concat(vm.arrFormGeneratorCol2).forEach((field, idex) => {
                    axios.put('/api/admin/acf/updateposition', { _id : field._id, position : field.position, idex : idex } );
                    Object.keys(field.model).forEach((e) => {
                        let arg = {
                            key: e,
                            value : { field : field.model[e] } ,
                        };
                        axios.put('/api/admin/meta/update', { arg : arg, postid : vm.$route.params.id });
                    });
                });
            }).then(() => {
                return vm.$router.push(`/admin/posts/${vm.$route.params.cpt}`);
            });
        },
        log(evt, ori){
            if(evt.added){
                if(evt.added.element.position == 'left'){
                    evt.added.element.position = 'right';
                }else{
                    evt.added.element.position = 'left';
                }
            }
        },
        async resInput(){
            var vm = this;
            this.arrFormGenerator.concat(vm.arrFormGeneratorCol2).forEach((v, index) => {
                v.fd.forEach((i) => {
                    v.model = {};
                    axios.post(`/api/admin/meta/getmeta`,{ arg : { postid : vm.$route.params.id, key : [i.formAcf.name] } }).then((res) => {
                        if(res.data[0]){
                            v.model = Object.assign({}, v.model, { [i.formAcf.name] : res.data[0].value.field });
                        }else{
                            v.model = Object.assign({}, v.model, { [i.formAcf.name] : i.attr.defaultsvalues });
                        } 
                    });
                    switch (i.formAcf.type) {
                        case 'input':
                            v.schema.fields.push( field_ex.fd_text(i.formAcf).fs );
                            break;
                        case 'textArea':
                            v.schema.fields.push( field_ex.fd_textarea(i.formAcf, i.attr).fs );
                            break;
                        case 'select':
                            v.schema.fields.push( field_ex.fd_select(i.formAcf, i.attr).fs );
                            break;
                        case 'array':
                            v.schema.fields.push( field_ex.fd_field_array(i.formAcf,i.attr ).fs );
                            break;
                        case 'array_multipe':
                            v.schema.fields.push( field_ex.fd_field_array_multipe(i.formAcf,i.attr ).fs );
                            break;   
                        case 'tinymce':
                            v.schema.fields.push( field_ex.fd_field_tinymce(i.formAcf,i.attr ).fs );
                            break; 
                        case 'image_field':
                            v.schema.fields.push( field_ex.fd_field_image(i.formAcf,i.attr ).fs );
                            break;
                        case 'image_multipe_field':
                            v.schema.fields.push( field_ex.fd_field_image_multipe(i.formAcf,i.attr ).fs );
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
                vm.arrFormGenerator.push({fd: field.field.fieldAcf, nameAcf : field.field.nameField, model : {}, schema : { fields: [] }, position : field.field.position, _id : field._id });
        });
        this.acfFieldRight.forEach((field) => {
                vm.arrFormGeneratorCol2.push({fd: field.field.fieldAcf, nameAcf : field.field.nameField, model : {}, schema : { fields: [] }, position : field.field.position, _id : field._id });
        });
        this.resInput().then(_ => {
            this.loadDatField = true;
        })
        
    },
    mounted() {
        // tinymce.init({
        //     selector: 'textarea'
        // });
    },
}
</script>

