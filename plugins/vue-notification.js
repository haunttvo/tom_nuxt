import Vue from 'vue';
if(process.BROWSER_BUILD){
    const Notifications = require('vue-notification');
    Vue.use(Notifications);
}

