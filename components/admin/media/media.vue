<template>
    <div id="media_manager_yi">
        <b-row>
            <b-col col lg="2">
                fsdfsdf
            </b-col>
            <b-col col lg="10">
                <b-card>
                    <div class="img-gellary-list">
                        <div class="row">
                            <div class="item-image-items col-lg-2" v-for="(item, index) in items_image" :key="index">
                                <img class="display_img" :src="`/upload/${item.src}`" alt="">
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

export default {
    data: function() {
      return {
        items_image: res
      };
    },
    methods:{
        getRootFolder(){
            axios.get('/api/admin/media/rootfolder').then((res) => {
                // console.log(res);
            });
        }
    },
    created(){
        this.getRootFolder();
    }
}
</script>
<style lang="scss">
    #media_manager_yi{
        .img-gellary-list{
            .item-image-items{
                img.display_img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>