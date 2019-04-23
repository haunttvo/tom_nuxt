import Vue           from 'vue'
import Notifications from 'vue-notification'

/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js'
*/
if(process.client){
    Vue.use(Notifications)
}
