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
                        <input type="text" v-model="field.inputName" class="form-control form-control-sm">
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
                //   inputType: "text",
                  label: "",
                //   model: "name",
                  inputName: "",
                //   required: true,
                //   validator: "string",
              },
            );
        },
    },
    watch: {
        'items.schema.fields' : {
            handler(val){
                this.$emit('change_field_multipe', this.items);
            },
            deep : true
        }
    }
}
</script>

