// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class DeleteCreditCardEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const {
      bankAccountID,
      customerID,
    } = params

    ctx.data = await stripe.customers.deleteSource(customerID, bankAccountID)
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'delete'
  }

  get url () {
    return '/:customerID/:bankAccountID'
  }
}





module.exports = DeleteCreditCardEndpoint
