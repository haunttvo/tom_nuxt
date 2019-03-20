<template>
    <div>
        <template v-for="(field, idex) in items.schema.fields">
            <div :key="idex">
                <table class="table table-acf-form">
                <tr>
                    <td class="Field Label">Field Label</td>
                    <td class="et-form">
                        <input type="text" v-model="field.label" class="form-control form-control-sm">
                    </td>
                </tr>
                <tr>
                    <td class="Field Label">Field Name</td>
                    <td class="et-form">
                        <input type="text" v-model="field.model" class="form-control form-control-sm">
                    </td>
                </tr>
                <tr>
                    <td class="Field Label">Field Type</td>
                    <td class="et-form">
                        <b-form-select size="sm" v-model="field.type" :options="TypeAcf" ></b-form-select>
                    </td>
                </tr>  
                </table>  
            </div>
        </template>
        <b-button variant="info" size="sm" @click="addFieldArrMultipe()">Add Field</b-button>
        <div class="box-tom">
            <div class="header-box-tom border-bottom-0">
                <span>Properties</span>
                <span class="float-right"><i class="fa fa-chevron-circle-up cursor-pointer bt-toggle-box-tom"></i></span>
            </div>
            <div class="tb-acf">
                <table class="table table-bordered table-acf-form">
                    <tbody>
                        <tr>
                            <td class="td-label"><p class="font-weight-bold">Field Classes</p></td>
                            <td class="et-form">
                                <input type="text" v-model="items.properties.FieldClasses" class="form-control form-control-sm">
                            </td>
                        </tr>
                        <tr>
                            <td class="td-label"><p class="font-weight-bold">Field Display</p></td>
                            <td class="et-form">
                                <div class="custom-control custom-radio">
                                    <input class="custom-control-input" id="__acf_rs_ds_1" type="radio" name="optradio" value="row" v-model="items.properties.display">
                                    <label class="custom-control-label" for="__acf_rs_ds_1">
                                        row
                                    </label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input class="custom-control-input" id="__acf_rs_ds_2" type="radio" name="optradio" value="column" v-model="items.properties.display">
                                    <label class="custom-control-label" for="__acf_rs_ds_2">
                                        column
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        TypeAcf : {
            type : Array,
            default : function(){
                return []
            }
        },
        propertiesField:{
            type:Object,
            default: () => {
                return {}
            }
        },
        dataField : {
            type : Array,
            default: () => {
                return []
            }
        }
    },
    data(){
        return {
            items: {
                type: 'object',
                default : {},
                properties : this.propertiesField,
                schema : {
                    fields : this.dataField
                }
            }
        }
    },
    methods: {
        addFieldArrMultipe(){
            var vm = this;
            this.items.schema.fields.push(
                {
                  type: "input",
                  inputType: "text",
                  label: "",
                  model: "",
                //   inputName: "",
                //   required: true,
                //   validator: "string",
              },
            );
        },
    },
    watch: {
        'items' : {
            handler(val){
                this.$emit('change_field_multipe', this.items);
            },
            deep : true
        }
    }
}
</script>

