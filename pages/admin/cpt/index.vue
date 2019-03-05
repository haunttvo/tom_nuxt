<template>
  <div>
      <nuxt-link to="/admin/cpt/addnew">Add new post type</nuxt-link>
      <b-table striped hover bordered="" index="1" :items="items" :fields="fields" >
        <template slot="action" slot-scope="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}}
          </b-button>
          <n-link :to='`/admin/cpt/edit/${row.item._id}`'>Edit</n-link>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
              <b-col>{{ row.item.age }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
              <b-col>{{ row.item.isActive }}</b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
          </b-card>
        </template>
      </b-table>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  layout: 'admin',
  methods:{
    getListCpt(){
      let self = this;
      axios.get('/api/admin/cpt').then( (res) => {
        this.items = res.data;  
      });
    }
  },
  data(){
    return{
        fields: ['name', 'slug', 'action'],
        items: []
    }
  },
  created(){
    this.getListCpt();
  },
}
</script>