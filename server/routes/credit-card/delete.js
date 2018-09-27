// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class DeleteCreditCardEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const {
      creditCardID,
      customerID,
    } = params

    ctx.data = await stripe.customers.deleteCard(customerID, creditCardID)
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'delete'
  }

  get url () {
    return '/:customerID/:creditCardID'
  }
}





module.exports = DeleteCreditCardEndpoint
