// Module imports
const { resolve } = require('path')
const {
  lstatSync,
  readdirSync,
} = require('fs')
const Router = require('koa-router')





// Component constants
const baseRoutesPath = resolve(__dirname, '..', 'routes')





module.exports = function buildRoutesFromDirectoryStructure (router, currentPath = '/') {
  const routesPath = currentPath ? (baseRoutesPath + currentPath) : baseRoutesPath
  const routesDirContents = readdirSync(routesPath)

  for (const routeFilename of routesDirContents) {
    const routePath = resolve(routesPath, routeFilename)

    if (lstatSync(routePath).isDirectory()) {
      const entityType = routeFilename
      const subrouter = new Router

      buildRoutesFromDirectoryStructure(subrouter, currentPath + routeFilename)

      router.use(`/${entityType}`, subrouter.routes(), subrouter.allowedMethods())
    } else {
      const route = new (require(routePath))

      router[route.method.toLowerCase()](route.url, route._handleRequest)
    }
  }
}
