// Component imports
const checkParameterTypes = require('../helpers/checkParameterTypes')





class BaseRoute {
  /***************************************************************************\
    Private methods
  \***************************************************************************/

  async _handleRequest (ctx) {
    const params = this.buildParams(ctx)
    let propTypeErrors = null

    if (this.propTypes) {
      propTypeErrors = await checkParameterTypes(this.propTypes, params, 'endpoint')
    }

    if (propTypeErrors) {
      ctx.status = 400
      return ctx.errors = [...(ctx.errors || []), ...propTypeErrors]
    }

    try {
      await this.handleRequest(ctx, params)

      if (!ctx.status) {
        ctx.status = 200
      }
    } catch (error) {
      console.log('ERROR', error)
      ctx.errors = [...(ctx.errors || []), error]
      ctx.status = 400
    }

    return ctx
  }





  /***************************************************************************\
    Public methods
  \***************************************************************************/

  constructor () {
    this._handleRequest = this._handleRequest.bind(this)
  }

  buildParams (ctx) {
    return {
      ...(this.defaultProps || {}),
      ...(ctx.request.body || {}),
      ...ctx.params,
    }
  }






  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'get'
  }

  get url () {
    return '/'
  }
}





module.exports = BaseRoute
