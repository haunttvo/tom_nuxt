<template>
    <div>
        <b-alert variant="success" show dismissible fade >Update Success!</b-alert>
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
                this.variant = notification.variant;
                this.text = notification.text;
                this.type = notification.type;
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