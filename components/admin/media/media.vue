<template>
    <div id="media_manager_yi">
        <b-row>
            <b-col col lg="2">
                <ul class="tree-item-media">
                    <li @click="resImageList(`./static/upload`)"><i class="fas fa-folder"></i> Upload</li>
                    <template v-for="(item, index) in treeFolder">
                        <treeFolder :items="item" :key="index"></treeFolder>
                    </template>
                </ul>
                
            </b-col>
            <b-col col lg="10">
                <b-card class="rounded-0">
                    <div class="img-gallety-header">
                        <b-button size="sm" variant="info" class="rounded-0"><i class="fas fa-plus"></i> Upload</b-button>
                    </div>
                    <div class="img-gellary-list">
                        <div class="row">
                            <div class="item-image-items col-lg-2" v-for="(item, index) in items_image" :key="index">
                                <!-- {{ ['.jpg', '.png'].indexOf(item.type) }} -->
                                <template v-if="['.jpg', '.png'].indexOf(item.type) >= 0">
                                    <img class="display_img" :src="`/upload/${item.dir}`" alt="">
                                </template>
                                <template v-else-if="['folder'].indexOf(item.type) == 0 ">
                                    <div class="cursor-pointer" @click="resImageList(`./static/upload/${item.dir}`)"><i class="fas fa-folder-open fz-9"></i><p>{{ item.name }}</p></div>
                                </template>
                            </div>
                        </div>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios';
import treeFolder from '~/components/admin/media/treeFolder';


export default {
    name : 'media',
    data: function() {
      return {
        items_image: [],
        treeFolder : []
      };
    },
    components : {treeFolder},
    methods:{
        getRootFolder(){
            let vm = this;
            axios.get('/api/admin/media/rootfolder').then((res) => {
                vm.treeFolder = res.data;
            });
        },
        resImageList(url){
            var vm = this;
            axios.post('/api/admin/media/listImageReq', { urlImage : url }).then((res) => {
                vm.items_image = res.data;
            })
        }
    },
    created(){
        let vm = this;
        this.getRootFolder();
        this.resImageList(`./static/upload`);
        this.$root.$on('getUrlDir', function(url){
            vm.items_image = [];
            vm.resImageList(url);  
        });
    }
}
</script>
<style lang="scss">
    #media_manager_yi{
        .fz-9{
            font-size: 9em;
        }
        .img-gallety-header{
            margin-bottom: 10px;
        }
        .img-gellary-list{
            .item-image-items{
                img.display_img{
                    width: 100%;
                    height: 150px;
                }
            }
        }
    }
</style>