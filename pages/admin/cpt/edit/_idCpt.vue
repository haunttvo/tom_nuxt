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
      <p class="t-red cursor-pointer" @click="deleteCpt()">Delete Post Type</p>
      <b-button type="submit" size="sm" variant="primary">Update</b-button>
      <b-button type="reset" size="sm" variant="danger">Reset</b-button>
    </b-form>
    </div>
</template>

<script>
import Vue from 'vue'
import VueTheMask from 'vue-the-mask'
import axios from 'axios'
Vue.use(VueTheMask)
export default {
    async asyncData ({ params }) {
      let res = await axios.get(`/api/admin/cpt/getCpt/${params.idCpt}`);
      return { formCpt : { name: res.data.name, slug : res.data.slug } }
    },
    layout : 'admin',
    middleware: 'md-before-params',
    data() {
      return {
        show: true
      }
    },
    methods:{
        onSubmit(evt){
          evt.preventDefault();
          axios.put('/api/admin/cpt/update', {id : this.$route.params.idCpt, arg : this.formCpt}).then((res) => {
            this.$nuxt.$router.push({path: '/admin/cpt', query : { status: 'success' }});
          });
        },
        onReset(){

        },
        deleteCpt(){
          let del = confirm('are you delete it');
          if(del){
            axios.delete(`${process.env.baseUrl}/api/admin/cpt/deleteCpt/${this.$route.params.idCpt}`).then((res) => {
              this.$nuxt.$router.push({path: '/admin/cpt', query : { status: 'success' }});
            });
          }
        }
    }
}
</script>

