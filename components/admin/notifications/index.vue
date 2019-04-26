<template>
    <div v-if="display">
        <b-alert :variant="variant" show dismissible fade >{{ text }}</b-alert>
    </div>
</template>

<script>
    export default {
        name : 'notifications',
        data() {
            return {
                display : false,
                variant : '',
                text : '',
                type : ''
            }
        },
        methods: {

        },
        mounted() {
            var notification = this.$session.flash.get('notification');
            if(typeof notification !== 'undefined'){
                this.display = true;
                this.variant = notification[0].variant;
                this.text = notification[0].text;
                this.type = notification[0].type;
            }

        }
    }
</script>
<style lang="scss" scoped>
    .alert{
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
    }
</style>