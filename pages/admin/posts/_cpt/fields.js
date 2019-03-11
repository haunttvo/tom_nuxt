export const field_ex = {
    /** type input */
    fd_text : function(arg){
        let fs = {
            inputType: 'text',
        }
        Object.assign(fs, arg);
        return { fs }
    },
    /** type select */
    fd_select : function(arg){
        let fs = {
            values : function(){
                return [
                    { id: 'vue', name : 'vue', value : '1' }
                ]
            }
        }
        Object.assign(fs, arg);
        return { fs }
    }
}