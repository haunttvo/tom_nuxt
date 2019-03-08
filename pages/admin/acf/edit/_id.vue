<template>
    <div>
        <b-form @submit="publishAcf()">
            <b-form-group label="Add new field Group">
                <b-form-input v-model="createItemAcf.nameField" v-validate="'required|max:50'" name="namefield" placeholder="Enter title here" type="text"></b-form-input>
                <div class="invalid-feedback d-block">
                    {{ errors.first('namefield') }}
                </div>
            </b-form-group>
            <div class="header-acf-field">
                <ul class="u-acf-head list-unstyled">
                    <li>Order</li>
                    <li>Label</li>
                    <li>Name</li>
                    <li>Type</li>
                </ul>
            </div>
            <div class="acf-form-wrapper">
                <template v-for="(itemAcf, i) in createItemAcf.fieldAcf">
                    <div class="items-acf" :key="i" :ref="'acf_table'+i">
                        <div class="head-acf">
                            <ul class="u-acf-head list-unstyled">
                                <li><span class="order">{{ i + 1 }}</span></li>
                                <li>
                                    <span>{{ (!itemAcf.formAcf.fieldLabel) ? 'No label' : itemAcf.formAcf.fieldLabel }}</span>
                                    <div class="fn-crud">
                                        <span class="edit-acf" @click="editAcf('acf_table' + i)">Edit</span>
                                        <span>Duplicate</span>
                                        <span>Move</span>
                                        <span @click="delteAcf(i)">Delete</span>
                                    </div>
                                </li>
                                <li><span>{{ (!itemAcf.formAcf.fieldName) ? 'No name' : itemAcf.formAcf.fieldName }}</span></li>
                                <li><span>{{ itemAcf.formAcf.fieldType }}</span></li>
                            </ul>
                        </div>
                        <div class="tb-acf">
                            <table class="table table-bordered table-acf-form">
                                <tbody>
                                    <tr>
                                        <td class="td-label">Field Label</td>
                                        <td class="et-form">
                                            <input type="text" required class="form-control form-control-sm" v-validate="'required|max:50'" name="field_label" v-model="itemAcf.formAcf.fieldLabel">
                                            <div class="invalid-feedback d-block">
                                                {{ errors.first('field_label') }}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td-label">Field Name</td>
                                        <td class="et-form">
                                            <input type="text" class="form-control form-control-sm" v-validate="'required|max:50'" name="field_name" v-model="itemAcf.formAcf.fieldName">
                                            <div class="invalid-feedback d-block">
                                                {{ errors.first('field_name') }}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td-label">Field Type</td>
                                        <td class="et-form">
                                            <b-form-select size="sm" v-model="itemAcf.formAcf.fieldType" :options="optionsTypeAcf"></b-form-select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
                <b-button variant="info" size="sm" @click="pushItemAcf()">Add field</b-button>
            </div>
            <!-- location -->
            <div class="box-tom">
                <div class="header-box-tom border-bottom-0">
                    <span>Location</span>
                    <span class="float-right"><i class="fa fa-chevron-circle-up cursor-pointer bt-toggle-box-tom"></i></span>
                </div>
                <div class="tb-acf">
                    <table class="table table-bordered table-acf-form">
                        <tbody>
                            <tr>
                                <td class="td-label"><p class="font-weight-bold">Rules</p><p>Create a set of rule to determine which edit screens will use these advanced custom fields</p>   </td>
                                <td class="et-form">
                                    <p>Show this field group if</p>
                                    <b-row>
                                        <b-col cols="3">
                                            <b-form-select size="sm" :options="optionType" v-model="createItemAcf.formLocation.optionChoiceType"></b-form-select>
                                        </b-col>
                                        <b-col cols="3">
                                           <b-form-select size="sm" :options="optionsTypeChoiceCpt" v-model="createItemAcf.formLocation.optionEqual"></b-form-select>         
                                        </b-col>
                                        <b-col cols="3">
                                           <b-form-select size="sm" :options="optionPostsType" v-model="createItemAcf.formLocation.optionPostType"></b-form-select>         
                                        </b-col>
                                    </b-row>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <b-button variant="info" size="sm" @click="updateAcf()" >Publish</b-button>
        </b-form>
    </div>
</template>

<script>
import Vue from 'vue';
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from 'vee-validate';
import axios from 'axios';
Vue.use(VeeValidate);
Validator.localize('ar', vi);
export default {
    layout : 'admin',
    async asyncData({params}){
        let dataAcf = await axios.get(`http://localhost:3000/api/admin/acf/getAcfItem/${params.id}`);
        return { itemDataAcf: dataAcf.data, createItemAcf : dataAcf.data.field }
    },
    data(){
        return{
            items: [
                {name: 'Field Label', typefield: ''},
                {name: 'Field Name', typefield: ''},
            ],
            optionsTypeAcf: [{ value : 'text', text: 'Text' }, { value : 'select', text:  'Select' }],
            optionPostsType : [{value : 'post', text: 'post'}, {value : 'page', text: 'page'}],
            optionType : [ {value : 'cpt', text: 'Post Type'} ],
            optionsTypeChoiceCpt : [{value : '=', text : 'is equal to'}],
        }
    },
    methods:{
        pushItemAcf(){
            this.createItemAcf.fieldAcf.push({
                formAcf:{
                    fieldLabel: '',
                    fieldName : '',
                    fieldType : 'text'
                }
            });
        },
        editAcf(ref){
            if( !jQuery(this.$refs[ref]).find('.u-acf-head').hasClass('active') ){
                jQuery(this.$refs[ref]).find('.u-acf-head').addClass('active');
            }else{
                jQuery(this.$refs[ref]).find('.u-acf-head').removeClass('active');
            }
            jQuery(this.$refs[ref]).find('.tb-acf').slideToggle();
        },
        delteAcf(index){
            if(index > -1){
                this.createItemAcf.fieldAcf.splice( index , 1);
            }    
            
        },
        updateAcf(){
            axios.put('/api/admin/acf/updateacf', { id: this.$route.params.id, args : this.createItemAcf } ).then((res) => {
                this.$router.push('/admin/acf');
            });
        }
    }
}
</script>

