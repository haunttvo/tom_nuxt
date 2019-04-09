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
                        <b-button size="sm" v-b-tooltip.hover title="Pre" variant="info" :disabled="currentLink.length == 1" class="rounded-0" @click="preUrlMedia()" ><i class="fas fa-long-arrow-alt-left"></i></b-button>
                        <b-button size="sm" v-b-tooltip.hover title="Next" variant="info" class="rounded-0" disabled="" ><i class="fas fa-long-arrow-alt-right"></i></b-button>
                        <b-button size="sm" v-b-tooltip.hover title="Delete" variant="info" :disabled="arrImgSelected.length == 0" @click="removeImageDir()" class="rounded-0"><i class="fas fa-trash-alt"></i></b-button>
                        <div class="d-inline-block">
                            <b-form inline>
                                <b-form-group>
                                    <b-form-input size="sm" class="rounded-0" placeholder="Search Name File"></b-form-input>
                                </b-form-group>
                                <b-form-group>
                                    <b-form-input type="date" class="rounded-0" size="sm"></b-form-input>
                                </b-form-group>
                            </b-form>
                        </div>
                        <b-button variant="primary" class="rounded-0" size="sm">Filter </b-button>
                    </div>
                    <div class="img-gellary-list">
                        <div class="row">
                            <div class="item-image-items col-lg-2" v-for="(item, index) in items_image" :key="index">
                                <template v-if="['.jpg', '.png'].indexOf(item.type) >= 0">
                                    <div class="item-img-line" v-if="typeDisplay == 'mediaManager'">
                                        <img class="display_img" :src="`/upload/${item.dir}`" alt="" @click="selectItemFs($event, item.dir)">
                                    </div>
                                    <div class="item-img-line" v-else-if="typeDisplay == 'singleImage'">
                                        <img class="display_img" :src="`/upload/${item.dir}`" alt="" @click="selectItemFsSingle($event, item.dir)">
                                    </div>
                                    <div class="item-img-line" v-else-if="typeDisplay == 'MultipeImage'">
                                        <img class="display_img" :src="`/upload/${item.dir}`" alt="" @click="selectItemFs($event, item.dir)">
                                    </div>
                                </template>
                                <template v-else-if="['folder'].indexOf(item.type) == 0 ">
                                    <div class="cursor-pointer" @dblclick="resImageList(`./static/upload/${item.dir}`)"><i class="fas fa-folder-open fz-9"></i><p>{{ item.name }}</p></div>
                                </template>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <b-button size="sm" @click="selectFile()" variant="primary">Select File</b-button>
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
    props :{
        typeDisplay : {
            type : String,
            default : 'mediaManager'
        }
    },
    data: function() {
      return {
        items_image: [],
        treeFolder : [],
        currentLink : [],
        arrImgSelected: [],
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
            vm.arrImgSelected = [];
            vm.items_image = [];
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
        selectFile(){
            this.$emit('selectImage', { file : this.arrImgSelected});
            jQuery('.item-img-line').removeClass('selected');
            this.arrImgSelected = [];
        },
        selectItemFs(evt, url){
            if(jQuery(evt.target).parent().hasClass('selected')){
                jQuery(evt.target).parent().removeClass('selected');
                let idex = this.arrImgSelected.indexOf(url);
                if(idex !== -1) this.arrImgSelected.splice(idex, 1);
            }else{
                this.arrImgSelected.push(url);
                jQuery(evt.target).parent().addClass('selected');
            }  
        },
        selectItemFsSingle(evt, url){
            this.arrImgSelected = [];
            this.arrImgSelected.push(url);
            jQuery('.item-img-line').removeClass('selected');
            jQuery(evt.target).parent().addClass('selected');
        },
        sendingEvent(file, xhr, formData){
            formData.append('urlDir', this.currentLink[this.currentLink.length - 1]);
        },
        removeImageDir(){
            let vm = this;
            axios.delete('/api/admin/media/removeArrImageDir',{ data : { arrImage: this.arrImgSelected } } ).then((res) => {
                if(vm.currentLink.length == 0 || vm.currentLink.length == 1){
                    this.resImageList('./static/upload');
                }
                vm.resImageList(vm.currentLink[vm.currentLink.length - 1]);
            });
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
                .item-img-line.selected::before{
                    content: "\f14a";
                    font-family: 'Font Awesome\ 5 Free';
                    font-weight: 900;
                    position: absolute;
                    z-index: 1;
                    right: 0;
                    color: #2980b9;
                    top: -7px;
                    font-size: 21px;
                }                
            }
            

        }
    }
</style>