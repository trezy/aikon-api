// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class DeleteCardEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const {
      accountID,
      cardID,
    } = params

    const account = await stripe.accounts.retrieve(accountID)
    const sourceID = account.external_accounts.data.find(({ id }) => (id === cardID)).metadata.sourceID

    await stripe.customers.deleteCard(account.metadata.customerID, sourceID)

    ctx.data = await stripe.accounts.deleteExternalAccount(accountID, cardID)
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'delete'
  }

  get url () {
    return '/:accountID/:cardID'
  }
}





module.exports = DeleteCardEndpoint
