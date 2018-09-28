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

    ctx.data = await stripe.accounts.retrieve(id)
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
