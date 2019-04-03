<template>
    <div>
        <i class="fas fa-images fa-3x" @click="openDialogMedia()"></i>
        <b-modal ref="open-media" hide-footer centered size="xl">
            <media></media>
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
        }
    },
}
</script>
