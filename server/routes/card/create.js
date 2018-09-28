// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')
const CardShape = require('../../shapes/card')





class CreateCardEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const {
      accountID,
      token,
    } = params

    const account = await stripe.accounts.retrieve(accountID)

    const externalAccount = await stripe.accounts.createExternalAccount(accountID, {
      external_account: token,
    })

    const customer = await stripe.customers.update(account.metadata.customerID, {
      source: token,
    })

    const sourceID = customer.sources.data.find(({ fingerprint }) => (fingerprint === externalAccount.fingerprint)).id

    ctx.data = await stripe.accounts.updateExternalAccount(accountID, externalAccount.id, {
      metadata: { sourceID },
    })
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'post'
  }

  get propTypes () {
    return {
      ...CardShape,
      accountID: PropTypes.string,
    }
  }

  get url () {
    return '/:accountID'
  }
}





module.exports = CreateCardEndpoint
