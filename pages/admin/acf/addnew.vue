<template>
    <div>
        <b-form>
            <b-form-group label="Add new field Group">
                <b-form-input placeholder="Enter title here" type="text"></b-form-input>
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
                                        <span>Delete</span>
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
                                            <input type="text" class="form-control" v-model="itemAcf.formAcf.fieldLabel">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td-label">Field Name</td>
                                        <td class="et-form">
                                            <input type="text" class="form-control" v-model="itemAcf.formAcf.fieldName">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td-label">Field Type</td>
                                        <td class="et-form">
                                            <b-form-select v-model="itemAcf.formAcf.fieldType" :options="optionsTypeAcf"></b-form-select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
                <b-button variant="info" @click="pushItemAcf()">Add new</b-button>
            </div>
            <!-- <b-table stacked striped hover bordered="" :items="items">
                <template slot="typefield">
                    <p>nguyen thanh hau</p>
                </template>
            </b-table> -->
            <div class="box-tom">
                <div class="header-box-tom">
                    <span>Location</span>
                    <span class="float-right"><i class="fa fa-chevron-circle-up cursor-pointer bt-toggle-box-tom"></i></span>
                </div>
                <div class="tb-acf">
                    <table class="table table-bordered table-acf-form">
                        <tbody>
                            <tr>
                                <td class="td-label"><p class="font-weight-bold">Rules</p><p>Create rule</p>   </td>
                                <td class="et-form">
                                    <p>Show this field group if</p>
                                    <b-row>
                                        <b-col cols="3">
                                            <b-form-select :options="optionType" v-model="createItemAcf.formLocation.optionChoiceType"></b-form-select>
                                        </b-col>
                                        <b-col cols="3">
                                           <b-form-select :options="optionsTypeChoiceCpt" v-model="createItemAcf.formLocation.optionEqual"></b-form-select>         
                                        </b-col>
                                        <b-col cols="3">
                                           <b-form-select :options="optionPostsType"></b-form-select>         
                                        </b-col>
                                    </b-row>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data(){
        return{
            items: [
                {name: 'Field Label', typefield: ''},
                {name: 'Field Name', typefield: ''},
            ],
            optionsTypeAcf: [{ value : 'text', text: 'Text' }, { value : 'select', text:  'Select' }],
            optionPostsType : [{value : 'post', text: 'post'}, {value : 'page', text: 'page'}],
            optionType : [ {value : 'cpt', text: 'Post Type'} ],
            optionsTypeChoiceCpt : [{value : 1, text : 'is equal to'}],
            createItemAcf : {
                fieldAcf : [],
                formLocation : {
                    optionChoiceType: 'cpt',
                    optionEqual : 1
                }
            }
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

