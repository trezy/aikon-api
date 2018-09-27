// Module imports
const body = require('koa-body')
const compress = require('koa-compress')
const cors = require('@koa/cors')
const Koa = require('koa')
const logger = require('koa-logger')
const removeTrailingSlashes = require('koa-no-trailing-slash')





// Component imports
const bodyBuilder = require('./middleware/bodyBuilder')
const config = require('./config')
const passConfig = require('./middleware/passConfig')
const router = require('./router')
const stripe = require('./middleware/stripe')
const twilio = require('./middleware/twilio')





// Component constants
const koa = new Koa





/******************************************************************************\
  Initialize the app
\******************************************************************************/

koa.use(logger())
koa.use(removeTrailingSlashes())
koa.use(compress())
koa.use(cors())
koa.use(body())
koa.use(passConfig())
koa.use(stripe())
koa.use(twilio())
koa.use(bodyBuilder())

// Configure the router
router(koa, config)

// Start the server
koa.listen(process.env.PORT || 3000)
