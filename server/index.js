const express = require('express')
const consola = require('consola')
require('express-group-routes')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

/** Import Controllers */

const cptControllers = require('./controllers/admin/cptControllers'); 

/** End Import Controller */


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
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function() {
    console.log("connected db ");
    // we're connected!
  });
  app.group('/api/admin/cpt', (router) => {
    cptControllers(router);
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
