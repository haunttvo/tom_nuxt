const express = require('express')
const consola = require('consola')
require('express-group-routes')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

/** Import Controllers */

const cptControllers = require('./controllers/admin/cptControllers'); 
const acfControllers = require('./controllers/admin/acfControllers'); 
const postsControllers = require('./controllers/admin/postsControllers'); 
const metaControllers = require('./controllers/admin/metaControllers'); 
const usersControllers = require('./controllers/admin/usersControllers');
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
    router.use([verifyTokenAdmin.verifyToken, verifyTokenAdmin.confirmTokened]);
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
  });
  app.group('/api/authen/admin', (router) => {
    authenAdminController(router);
  });
  // app.get('/api/admin/login123', (req, res) => {
  //   res.send('ok');
  // });
  
  // function verifyToken(req, res, next){
  //   const bearerHeader = req.headers['authorization'];
  //   if(typeof bearerHeader !== 'undefined'){
  //       const bearer = bearerHeader.split(' ');
  //       // get token
  //       const bearerToken = bearer[1];
  //       req.token = bearerToken;
  //       next();
  //   }else{
  //       res.sendStatus(403);
  //   }
  // }

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
