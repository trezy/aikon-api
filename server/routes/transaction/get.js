// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class GetTransactionEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const { id } = params

    ctx.data = await stripe.charges.retrieve(id)
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





module.exports = GetTransactionEndpoint
