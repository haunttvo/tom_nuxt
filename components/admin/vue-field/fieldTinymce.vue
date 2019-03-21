<template>
<editor api-key="4zp3khtm2s5naymgl7i1eanj8uvxbe20nzuqx5e5aouoe8yi" rows="25" v-model="value" :init="{plugins: 'wordcount image code'}"></editor>
    <!-- <input 
        class="form-control" 
        type="text" 
        v-model="value" 
        :disabled="disabled"
        :maxlength="schema.max"
        :placeholder="schema.placeholder"
        :readonly="schema.readonly" > -->
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ],
         components : {
             'editor': Editor,
         }
   };
</script>