// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class GetCustomerEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const { id } = params

    const account = await stripe.accounts.retrieve(id)
    const customer = await stripe.customers.retrieve(account.metadata.customer)

    ctx.data = {
      ...account,
      customer,
    }
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get propTypes () {
    return {
      id: PropTypes.string.isRequired,
    }
  }

  get url () {
    return '/:id'
  }
}





module.exports = GetCustomerEndpoint
