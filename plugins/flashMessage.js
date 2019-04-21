import Vue from 'vue';

window.events = new Vue();

window.flash = function(message){
    window.events.$emit('flash', message);
}