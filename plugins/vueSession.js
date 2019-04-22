import Vue from 'vue';
import VueSession from 'vue-session';
if (process.client){
    Vue.use(VueSession);
}
