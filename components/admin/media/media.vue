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
                        <b-button size="sm" variant="info" @click="showModalUpload()" class="rounded-0"><i class="fas fa-plus"></i> Upload</b-button>
                        <b-button size="sm" variant="info" :disabled="currentLink.length == 1 " class="rounded-0" @click="preUrlMedia()" ><i class="fas fa-long-arrow-alt-left"></i></b-button>
                        <b-button size="sm" variant="info" class="rounded-0" disabled="" ><i class="fas fa-long-arrow-alt-right"></i></b-button>
                    </div>
                    <div class="img-gellary-list">
                        <div class="row">
                            <div class="item-image-items col-lg-2" v-for="(item, index) in items_image" :key="index">
                                <template v-if="['.jpg', '.png'].indexOf(item.type) >= 0">
                                    <div class="item-img-line">
                                        <img class="display_img" :src="`/upload/${item.dir}`" alt="" @click="selectItemFs($event)">
                                    </div>
                                </template>
                                <template v-else-if="['folder'].indexOf(item.type) == 0 ">
                                    <div class="cursor-pointer" @dblclick="resImageList(`./static/upload/${item.dir}`)"><i class="fas fa-folder-open fz-9"></i><p>{{ item.name }}</p></div>
                                </template>
                            </div>
                        </div>
                    </div>
                </b-card>
            </b-col>
            <b-col col lg="12">
                <b-modal ref="popup-upload-media" class="popup-upload-media" hide-footer centered size="lg">
                    <div class="d-block">
                        <dropzone id="foo" ref="el" v-on:vdropzone-sending="sendingEvent" @vdropzone-complete="afterCompleteUpload" :options="options" :destroyDropzone="true"></dropzone>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios';
import treeFolder from '~/components/admin/media/treeFolder';
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
export default {
    name : 'media',
    data: function() {
      return {
        items_image: [],
        treeFolder : [],
        currentLink : [],
        options: {
            url: "/api/admin/media/uploadFile",
            headers: { "Authorization" : `Bearer ${this.$store.state.authAdmin}` },
            paramName : 'fileSingle'
        }
      };
    },
    components : {treeFolder, Dropzone},
    methods:{
        getRootFolder(){
            let vm = this;
            axios.get('/api/admin/media/rootfolder').then((res) => {
                vm.treeFolder = res.data;
            });
        },
        resImageList(url, pre = false){
            var vm = this;
            if(!pre){
                this.currentLink.push(url);
            }
            axios.post('/api/admin/media/listImageReq', { urlImage : url }).then((res) => {
                vm.items_image = res.data;
            });
        },
        showModalUpload(){
            this.$refs['popup-upload-media'].show();
        },
        afterCompleteUpload(){
            this.$refs['popup-upload-media'].hide();
            this.resImageList(this.currentLink[this.currentLink.length - 1]);
        },
        preUrlMedia(){
            this.currentLink.pop();
            this.resImageList(this.currentLink[this.currentLink.length - 1], true);
        },
        selectItemFs(evt){
            if(jQuery(evt.target).parent().hasClass('selected')){
                jQuery(evt.target).parent().removeClass('selected')
            }else{
                jQuery(evt.target).parent().addClass('selected');
            }  
        },
        sendingEvent(file, xhr, formData){
            formData.append('urlDir', this.currentLink[this.currentLink.length - 1]);
        }
    },
    created(){
        let vm = this;
        this.getRootFolder();
        this.resImageList('./static/upload');
        this.$root.$on('getUrlDir', function(url){
            vm.items_image = [];
            vm.resImageList(url);  
        });
    }
}
</script>
<style lang="scss">
    .modal-content{
        border-radius: 0;
    }
    #media_manager_yi{
        .fz-9{
            font-size: 9em;
        }
        .img-gallety-header{
            margin-bottom: 10px;
        }
        .img-gellary-list{
            .item-image-items{
                
                .item-img-line{
                    position: relative;
                    overflow: hidden;
                    padding-bottom: 100%;
                    img.display_img{
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        position: absolute;
                    }
                    
                }
                .item-img-line.selected{
                    outline: 4px solid #2980b9;
                }
                // .item-img-line.selected::before{
                //     font-family: "Font Awesome 5 Free";
                //     content: "\f067";
                //     position: absolute;
                // }                
            }
            

        }
    }
</style>