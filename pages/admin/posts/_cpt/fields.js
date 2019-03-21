// import WidgetListColumnEditorContainer from '~/components/admin/acf/widgetItemContainer';
export const field_ex = {
    /** type input */
    fd_text : function(arg){
        let fs = {
            inputType: 'text',
            model : arg.name
            // model : 'price1'
        }
        Object.assign(fs, arg);
        return { fs }
    },
    fd_textarea : function(arg, attr){
        let fs = {
            rows: 20,
            model : arg.name
            // model : 'price1'
        }
        Object.assign(fs, arg);
        return { fs }
    },
    /** type select */
    fd_select : function(arg, attr){
        var arr_df = [];
        attr.choice.split('\n').forEach((e) => {
            arr_df.push({id : e.split(':')[1].replace(' ', ''), name : e.split(':')[1].replace(' ', ''), value: e.split(':')[0].replace(' ', '')});
        });
        let fs = {
            model : arg.name,
            values : function(){
                return arr_df;
            }
        }
        Object.assign(fs, arg);
        return { fs }
    },
    fd_field_array : function(arg, attr){
        let fs = {
            type: "array",
            model : arg.name,
            showRemoveButton: true,
            itemFieldClasses: "form-control form-control-sm",
            fieldClasses : 'acf_field_group_array_wrapper',
            newElementButtonLabelClasses: "btn btn-info btn-sm",
            // itemContainerComponent: "Container"
        }
        Object.assign(fs, arg);

        return {fs}
    },
    fd_field_array_multipe: function(arg, attr){
        let fs = {
            type : 'array',
            label: arg.label,
            model: arg.name,
            showRemoveButton: true,
            newElementButtonLabelClasses: "btn btn-outline-dark mt-2",
            fieldClasses: (arg.items.properties.display == 'column') ? 'field-column-wrapper acf-group-multipe-array ' + arg.items.properties.FieldClasses: 'acf-group-multipe-array ' +arg.items.properties.FieldClasses,
            newElementButtonLabelClasses: "btn btn-info btn-sm",
            items : {
                type : 'object',
                schema : {
                    fields : arg.items.schema.fields
                }
            }
        }
        // Object.assign(fs, arg);
        return {fs}
    },
    /** type tinymce */
    fd_field_tinymce(arg, attr){
        let fs = {
            type: "tinymce",
            model : arg.name
            // showRemoveButton: true,
            // itemFieldClasses: "form-control form-control-sm",
            // fieldClasses : 'acf_field_group_array_wrapper',
            // newElementButtonLabelClasses: "btn btn-info btn-sm",
            // itemContainerComponent: "Container"
        }
        Object.assign(fs, arg);

        return {fs}
    }
}