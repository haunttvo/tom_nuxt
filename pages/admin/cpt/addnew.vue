<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="formCpt"
        label="Name post type"
        label-for="cptName"
        description="Name of post type"
      >
        <b-form-input
          id="cptName"
          type="text"
          v-model="formCpt.name"
          autocomplete="off"
          required
          placeholder="Enter Name Post Type" />
      </b-form-group>

      <b-form-group id="exampleInputGroup2" label="Slug post type:" label-for="cptSlug">
        <b-form-input
          id="cptSlug"
          type="text"
          v-model="formCpt.slug"
          v-mask="'XXXXXXXXXXXXXXXXXXXXXXXX'"
          autocomplete="off"
          required
          placeholder="Enter Slug Post Type" />
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </div>
</template>

<script>
import Vue from 'vue'
import VueTheMask from 'vue-the-mask'
import axios from 'axios'
Vue.use(VueTheMask)
export default {
    layout : 'admin',
    data() {
      return {
        formCpt: {
          name: '',
          slug: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        // this.$validator.validateAll();
        evt.preventDefault()
        axios.post('/api/admin/cpt/addnew', this.formCpt ).then( (res) => {
          console.log(res);
        });
       
        // alert(JSON.stringify(this.form))
      },
      onReset(){

      }
    }
}
</script>

