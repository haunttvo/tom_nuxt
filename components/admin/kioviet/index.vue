<template>
    <div>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th colspan="5">
                        <div class="row form-inline">
                            <div class="col-md-4 col-sm-12">
                                <select name="" v-model="bulkAction" class="form-control form-control-sm" id="">
                                    <option value="">Bulk Action</option>
                                    <option value="1">Đồng bộ</option>
                                    <option value="2">Xóa</option>
                                </select>
                                <button @click="BulkAction()" class="btn btn-success btn-sm">Submit</button>
                            </div>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th width="20">
                        <div class="custom-control custom-checkbox">
                            <input @click="AllCheckbox()" v-model="allData" type="checkbox" class="custom-control-input" id="allPr">
                            <label class="custom-control-label" for="allPr"></label>
                        </div>
                    </th>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(product, key) in Object.keys(dataProduct)  ">
                    <tr>
                        <td>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" v-model="itemChoice" :value="dataProduct[product]" class="custom-control-input" :id="key+'itempr'">
                                <label class="custom-control-label" :for="key+'itempr'"></label>
                            </div>
                        </td>
                        <td>{{ dataProduct[product][0].name }}</td>
                        <td>abnc</td>
                        <td>Quần jean</td>
                        <td>
                            <button class="btn btn-primary">Sửa</button>
                            <button class="btn btn-warning">Xóa</button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <!--<button @click="SyncKivoet()" class="btn btn-info">Sync</button>-->
        <!--<button @click="SyncCategories()" class="btn btn-info">SyncCategories</button>-->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
      return{
          dataProduct : {},
          itemChoice : [],
          bulkAction : '',
          allData : false,
          pagination : []
      }
    },
    methods: {
        BulkAction(){
          if(this.bulkAction === '1'){
              this.SyncKivoet(this.itemChoice);
          }
        },
        getAccessToken(){
            let vm = this;
            axios.get('/api/admin/kioviet/getproducts').then(res => {
                vm.dataProduct = res.data.data;
                console.log( parseInt(res.data.total/res.data.pagesize) );
            });
        },
        SyncKivoet(data){
            let vm =this;
            axios.post('/api/admin/kioviet/sync', { data: data }).then(res => {
                console.log(res);
            });
        },
        SyncCategories(){
            axios.get('/api/admin/kioviet/syncterm').then(res => {
                console.log(res);
            });
        },
        AllCheckbox(){

        }
    },
    mounted() {
        this.getAccessToken();
    },
    watch:{
        'allData' : function(vl){
            let vm = this;
            this.itemChoice = [];
            if(vl){
                Object.keys(this.dataProduct).forEach(function(item){
                    vm.itemChoice.push(vm.dataProduct[item]);
                });
            }
        }
    }
}
</script>

