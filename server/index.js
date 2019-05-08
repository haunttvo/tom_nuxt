const express = require('express')
const consola = require('consola')
require('express-group-routes')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
app.use(express.static('static'))
/** Import Controllers */

const cptControllers = require('./controllers/admin/cptControllers'); 
const acfControllers = require('./controllers/admin/acfControllers'); 
const postsControllers = require('./controllers/admin/postsControllers'); 
const metaControllers = require('./controllers/admin/metaControllers'); 
const usersControllers = require('./controllers/admin/usersControllers');
const mediaControllers = require('./controllers/admin/mediaControllers');
const termsControllers = require('./controllers/admin/termsControllers');
const metaTermsControllers = require('./controllers/admin/metaTermsControllers');
const kiovietControllers = require('./controllers/admin/kiovietControllers');
/** End Import Controller */
/* middleware */
const authenAdminController = require('./controllers/admin/authenAdminController');
const verifyTokenAdmin = require('./middleware/verifyTokenAdmin');

// app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  mongoose.connect(config.connectString,{useNewUrlParser: true});
  mongoose.set('useCreateIndex', true);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function() {
    console.log("connected db ");
    // we're connected!
  });

  app.group('/api/admin', (router) => {
    router.use([verifyTokenAdmin.verifyToken]);
    router.group('/cpt', (router) => {
      cptControllers(router);
    });
    router.group('/acf', (router) => {
      acfControllers(router);
    });
    router.group('/posts', (router) => {
      postsControllers(router);
    });
    router.group('/meta', (router) => {
      metaControllers(router);
    });
    router.group('/users', (router) => {
      usersControllers(router);
    });
    router.group('/media', (router) => {
      mediaControllers(router);
    });
    router.group('/terms', (router) => {
      termsControllers(router);
    });
    router.group('/metaterms', (router) => {
      metaTermsControllers(router);
    });
    /* module kioviet */
    router.group('/kioviet', (router) => {
      kiovietControllers(router);
    })
  });
  app.group('/api/authen/admin', (router) => {
    authenAdminController(router);
  });
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
