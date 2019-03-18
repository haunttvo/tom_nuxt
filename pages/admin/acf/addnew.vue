<template>
    <div>
        <b-form @submit="publishAcf()">
            <b-form-group label="Add new field Group">
                <b-form-input v-model="createItemAcf.nameField" v-validate="'required|max:50'" name="namefield" placeholder="Enter title here" type="text"></b-form-input>
                <div class="invalid-feedback d-block">
                    {{ vErrors.first('namefield') }}
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
                                    <span>{{ (!itemAcf.formAcf.label) ? 'No label' : itemAcf.formAcf.label }}</span>
                                    <div class="fn-crud">
                                        <span class="edit-acf" @click="editAcf('acf_table' + i)">Edit</span>
                                        <span>Duplicate</span>
                                        <span>Move</span>
                                        <span @click="delteAcf(i)">Delete</span>
                                    </div>
                                </li>
                                <li><span>{{ (!itemAcf.formAcf.name) ? 'No name' : itemAcf.formAcf.name }}</span></li>
                                <li><span>{{ itemAcf.formAcf.type }}</span></li>
                            </ul>
                        </div>
                        <div class="tb-acf">
                            <table class="table table-bordered table-acf-form">
                                <tbody>
                                    <tr>
                                        <td class="td-label">Field Label</td>
                                        <td class="et-form">
                                            <input type="text" class="form-control form-control-sm" v-validate="'required|max:50'" name="field_label" v-model="itemAcf.formAcf.label">
                                            <div class="invalid-feedback d-block">
                                                {{ vErrors.first('field_label') }}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td-label">Field Name</td>
                                        <td class="et-form">
                                            <input type="text" class="form-control form-control-sm" v-mask="'XXXXXXXXXXXXXXXXXXXXXXXX'" v-validate="'required|max:50'" name="field_name" v-model="itemAcf.formAcf.name">
                                            <div class="invalid-feedback d-block">
                                                {{ vErrors.first('field_name') }}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td-label">Field Type</td>
                                        <td class="et-form">
                                            <b-form-select size="sm" v-model="itemAcf.formAcf.type" :options="optionsTypeAcf" @change="changeValueFieldType(itemAcf.formAcf.type, i)"></b-form-select>
                                        </td>
                                    </tr>
                                    <tr v-if="itemAcf.formAcf.type == 'select'">
                                        <td class="td-label">Choice</td>
                                        <td class="et-form">
                                            <textarea name="" v-model="itemAcf.attr.choice" rows="8" cols="80" class="form-control"></textarea>
                                        </td>
                                    </tr>
                                    <tr v-if="itemAcf.formAcf.type == 'array_multipe'">
                                        <td class="td-label">
                                            Array Multipe Field
                                        </td>
                                        <td>
                                            {{ itemAcf.formAcf.items.schema }}
                                            <!-- <table class="table table-bordered table-acf-form">
                                                
                                                <template v-for="(fieldmultipe, index) in itemAcf.formAcf.items.schema.fields">
                                                    <div :key="index">
                                                        <tr>
                                                            <td class="Field Label">Field Label</td>
                                                            <td class="et-form">
                                                                <input type="text" class="form-control form-control-sm">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="Field Label">Field Name</td>
                                                            <td class="et-form">
                                                                <input type="text" class="form-control form-control-sm">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="Field Label">Field Type</td>
                                                            <td class="et-form">
                                                                <input type="text" class="form-control form-control-sm">
                                                            </td>
                                                        </tr>
                                                    </div>
                                                </template>
                                            </table> -->
                                            <b-button variant="info" size="sm" @click="addFieldArrMultipe(i)">Add Field</b-button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td-label">Default Values</td>
                                        <td class="et-form">
                                              <input type="text" v-model="itemAcf.attr.defaultsvalues" class="form-control form-control-sm">
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
            <div class="box-tom">
                <div class="header-box-tom border-bottom-0">
                    <span>Position</span>
                    <span class="float-right"><i class="fa fa-chevron-circle-up cursor-pointer bt-toggle-box-tom"></i></span>
                </div>
                <div class="tb-acf">
                    <table class="table table-bordered table-acf-form">
                        <tbody>
                            <tr>
                                <td class="td-label"><p class="font-weight-bold">Position</p></td>
                                <td class="et-form">
                                    <b-row>
                                        <b-col cols="12">
                                            <b-form-select size="sm" v-model="createItemAcf.position" :options="optionPosition"></b-form-select>
                                        </b-col>
                                    </b-row>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <b-button variant="info" size="sm" @click="publishAcf()" >Publish</b-button>
        </b-form>
    </div>
</template>

<script>
import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import axios from 'axios';
import formField from '~/components/admin/acf/formField';
Vue.use(VueTheMask);
export default {
    layout: 'admin',
    components: {formField},
    data(){
        return{
            items: [
                {name: 'Field Label', typefield: ''},
                {name: 'Field Name', typefield: ''},
            ],
            optionsTypeAcf: [
                { value : 'input', text: 'Input' }, 
                { value : 'select', text:  'Select' }, 
                { value : 'array', text:  'Array' },
                { value : 'array_multipe', text : 'Array Multipe' }
            ],
            optionPostsType : [{value : 'post', text: 'post'}, {value : 'page', text: 'page'}],
            optionType : [ {value : 'cpt', text: 'Post Type'} ],
            optionPosition : [ {value : 'left', text : 'Left'},{value : 'right', text : 'Right'} ],
            optionsTypeChoiceCpt : [{value : '=', text : 'is equal to'}],
            loadMuiltipe: false,
            createItemAcf : {
                nameField: '',
                fieldAcf : [],
                formLocation : {
                    optionChoiceType: 'cpt',
                    optionEqual : '=',
                    optionPostType : 'post'
                },
                position : 'left'
            }
        }
    },
    methods:{
        pushItemAcf(){
            this.createItemAcf.fieldAcf.push({
                formAcf:{
                    label: '',
                    name : '',
                    type : 'input'
                },
                attr:{
                  defaultsvalues: '',
                  choice : ''
                }
            });
        },
        addFieldArrMultipe(index){
            var vm = this;
            this.createItemAcf.fieldAcf[index].formAcf.items.schema.fields.push(
                {
                  type: "input",
                //   inputType: "text",
                  label: "Name",
                //   model: "name",
                  inputName: "name",
                //   required: true,
                //   validator: "string",
              },
            );
        },
        changeValueFieldType(value, index){
            if( value != 'array_multipe' ){
                delete this.createItemAcf.fieldAcf[index].formAcf.items;
            }else{
                 this.createItemAcf.fieldAcf[index].formAcf['items'] = {
                    type: 'object',
                    schema : {
                        fields : []
                    }
                }
            }
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
        publishAcf(){
            this.$validator.validate().then(valid => {
                if (valid) {
                    axios.post('/api/admin/acf/addnewacf', { field: this.createItemAcf }).then((res) => {
                        return this.$router.push('/admin/acf');
                    });
                }
            });

        }
    },
    mounted(){
        // $(document).on('.fn-crud .edit-acf','click', function(){
        //     $(this).parents('.head-acf').next().slideToggle();
        //   if( !$(this).parents('.u-acf-head').hasClass('active') ){
        //       $(this).parents('.u-acf-head').addClass('active');
        //   }else{
        //       $(this).parents('.u-acf-head').removeClass('active');
        //   }
        // });
    }
}
</script>
