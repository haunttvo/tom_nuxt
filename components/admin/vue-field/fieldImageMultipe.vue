<template>
    <div>
            <div class="items-single-multipe"  >
                <template v-if="value">
                    <div class="image-single-multipe" v-for="(it, index) in value" :key="index">
                        <img class="img-thumbnail" :src="`/upload/${it}`" alt="">
                        <i class="fas fa-times" @click="removeItemImg(index)"></i>
                    </div>
                </template>
                
                <div class="border-dashed-upload" @click="openDialogMedia()">
                    <i class="fas fa-upload fa-2x pt-2"></i>
                    <span>Choose File</span> 
                </div>
            </div>
        <b-modal ref="open-media" hide-footer centered size="xl">
            <media typeDisplay="MultipeImage" @selectImage="selectImageRes"></media>
        </b-modal>
    </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
import media from '~/components/admin/media/media';
export default {
    name: 'MultipeImage',
    mixins: [ abstractField ],
    components : {media},
    methods:{
        selectImageRes(data){
            let vm = this;
            data.file.forEach(element => {
                vm.value.push(element);
            });
            this.$refs['open-media'].hide();
        },
        openDialogMedia(){
            this.$refs['open-media'].show();
        },
        removeItemImg(index){
            this.value.splice(index, 1);
        }
    }
}
</script>
<style lang="scss">
.border-dashed-upload{
    margin-top: 2px;
    border: 3px dashed #ccc;
    width: 80px;
    height: 75px;
    color: #ccc;
    text-align: center;
    cursor: pointer;
    span{
        font-size: 12px;
    }
}
.items-single-multipe{
    display: flex;
    flex-flow: wrap;
    .image-single-multipe{
        width: 80px;
        height: 80px;
        margin-right: 4px;
        margin-bottom: 4px;
        position: relative;
        img{
            height: 100%;
        }
        i{
            position: absolute;
            top: -4px;
            left: -2px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            color: #fff;
            background-color: #bdc3c7;
            text-align: center;
            font-size: 12px;
            line-height: 1.7;
        }
    }
}
    
</style>
