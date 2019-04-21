const pkg = require('./package');
const webpack = require("webpack");
module.exports = {
  mode: 'universal',
  env: {
    baseUrl: 'https://nuxtcms.herokuapp.com/' || 'https://nuxtcms.herokuapp.com/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet" , type: "text/css" , href:'https://use.fontawesome.com/releases/v5.7.2/css/all.css' }
    ],
    script:[
      {src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
      {src:'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'},
      // {src : 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.0.3/plugins/advlist/plugin.js'},
      {src:'https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.0.3/tinymce.min.js'},
      
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '@/assets/admin/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src : '~/plugins/veeValidator'},
    { src : '~/plugins/@nuxtaxios' },
    { src : '~/plugins/settingAxios' },
    { src : '~/plugins/vue-notification' },
    // { src : '~/plugins/jquerySetting' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      config.node = {
         fs: 'empty'
      }
      // ....
    }
  },
  connectString: 'mongodb://sohuyn1996:meo123456@ds151805.mlab.com:51805/nuxt_tom',
}
