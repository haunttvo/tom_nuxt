<template>
    <div>
        <template v-if="value">
            <div class="single-image">
                <div class="edit-image-single" @click="openDialogMedia()">
                    <i class="fas fa-edit"></i>
                </div>
                <img class="img-thumbnail" :src="`/upload/${value[0]}`" alt="">
                <i class="fas fa-times del-image-choice" @click="removeItemImage()"></i>
            </div>
        </template>
        <template v-else>
            <div class="border-dashed-upload" @click="openDialogMedia()">
                <i class="fas fa-upload fa-2x pt-2"></i>
                <span>Choose File</span> 
            </div>
        </template>
        <b-modal ref="open-media" hide-footer centered size="xl">
            <media typeDisplay="singleImage" @selectImage="selectImageRes"></media>
        </b-modal>
        
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";
import media from '~/components/admin/media/media';
export default {
    mixins: [ abstractField ],
    components : {media},
    methods: {
        openDialogMedia(){
            this.$refs['open-media'].show();
        },
        selectImageRes(data){
            this.value = data.file;
            this.$refs['open-media'].hide();
        },
        removeItemImage(){
            this.value = '';
        }
    }
}
</script>

<style lang="scss" scoped>
    .single-image{
        position: relative;
        display: inline-block;
        .edit-image-single{
            position: absolute;
            left: 9px;
            top: 9px;
            opacity: 0.8;
            i{
                padding: 7px;
                border-radius: 50%;
                cursor: pointer;
                color: #fff;
                background-color: #bdc3c7;
            }
        }
        .edit-image-single:hover{
            opacity: 1;
        }
        .del-image-choice{
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            color: red;
            cursor: pointer;
        }
    }
</style>

