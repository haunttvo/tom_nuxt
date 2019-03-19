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
        }
        Object.assign(fs, arg);

        return {fs}
    },
    fd_field_array_multipe: function(arg, attr){
        // console.log(arg.items.schema.fields);
        let fs = {
            type : 'array',
            label: 'Columns',
            model: 'columns',
            items : {
                type : 'object',
                schema : {
                    fields : [{
                        type: 'input',
                        inputType: 'text',
                        label: 'Label',
                        model: 'label',
                      },{
                        type: 'input',
                        inputType: 'text',
                        label: 'Field',
                        model: 'field',
                      }]
                }
            }
        }
        // Object.assign(fs, arg);
        return {fs}
    }
}