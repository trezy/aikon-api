// Module imports
const { readdirSync } = require('fs')
const {
  extname,
  resolve,
} = require('path')
const Router = require('koa-router')





// Module imports
const buildRoutesFromDirectoryStructure = require('./helpers/buildRoutesFromDirectoryStructure')





// Component constants
const router = new Router





module.exports = koa => {
  buildRoutesFromDirectoryStructure(router)

  koa.use(router.routes())
  koa.use(router.allowedMethods())
}
