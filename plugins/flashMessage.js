import Vue from 'vue';

if(process.client){
    window.events = new Vue();

    window.flash = function(message){
        console.log(123213213);
        window.events.$emit('flash', message);
    }
}

