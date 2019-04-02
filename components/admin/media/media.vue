<template>
    <div id="media_manager_yi">
        <b-row>
            <b-col col lg="2">
                <template v-for="(item, index) in treeFolder">
                    <treeFolder :items="item" :key="index"></treeFolder>
                </template>
                
            </b-col>
            <b-col col lg="10">
                <b-card>
                    <div class="img-gellary-list">
                        <div class="row">
                            <div class="item-image-items col-lg-2" v-for="(item, index) in items_image" :key="index">
                                <img class="display_img" :src="item.name" alt="">
                            </div>
                        </div>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
var cache = {};
const images = require.context('@/static/upload', false, /\.(jpg|png|php)$/ );
var imagesArray = Array.from(images.keys());
var constructed = [];
function constructItems(fileNames, constructed) {
    fileNames.forEach(fileName => {
        constructed.push({
            'src': fileName.substr(1)
        })
    });
    return constructed;
}
var res = constructItems(imagesArray, constructed);

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
            var listImg = [];
            var vm = this;
            axios.post('/api/admin/media/listImageReq', { urlImage : url }).then((res) => {
                listImg = res.data;
                listImg.forEach(element => {
                    // var a = element.match(/\.(jpeg|jpg|gif|png)$/);
                    if(element.type.match(/\.(jpeg|jpg|gif|png)$/)){
                        element['icon'] = 'abc';
                    }else{
                        element['icon'] = '1'; 
                    }
                });
            }).then(() => {
                vm.items_image = listImg;
                // console.log(listImg); 
            });
        }
    },
    created(){
        let vm = this;
        this.getRootFolder();
        this.resImageList(`D:/NTHTVO/tom_nuxt/static/upload`);
        this.$root.$on('getUrlDir', function(url){
            vm.items_image = [];
            vm.resImageList(url);  
        });
    }
}
</script>
<style lang="scss">
    #media_manager_yi{
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