// Component imports
const BaseRoute = require('../../helpers/BaseRoute')
const AccountShape = require('../../shapes/account')





class UpdateCustomerEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const { id } = params

    const accountUpdates = { ...params }
    delete accountUpdates.id

    ctx.data = await stripe.accounts.update(id, accountUpdates)
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get defaultProps () {
    return {
      legal_entity: {
        type: 'individual',
      },
    }
  }

  get method () {
    return 'put'
  }

  get propTypes () {
    return AccountShape
  }

  get url () {
    return '/:id'
  }
}





module.exports = UpdateCustomerEndpoint
