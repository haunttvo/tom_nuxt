<template>
  <div>
    <b-alert
      :show="$route.query.status != null" 
      dismissible 
      variant="success"
    >
      Thêm mới thành công
    </b-alert>
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
  async asyncData({params}){
    const {data} = await axios.get(`http://localhost:3000/api/admin/cpt`);
    return { items: data } 
  },  
  layout: 'admin',
  data(){
    return{
        fields: ['name', 'slug', 'action'],
    }
  }
}
</script>