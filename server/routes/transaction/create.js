// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class CreateTransactionEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const {
      amount,
      accountID,
      source,
    } = params

    const account = await stripe.accounts.retrieve(accountID)

    const chargeInfo = {
      amount,
      currency: 'usd',
      customer: account.metadata.customerID,
      metadata: {
        paid: false,
        readyToPay: false,
      },
    }

    if (source) {
      chargeInfo.source = account.external_accounts.data.find(({ id }) => (id === source)).metadata.sourceID
    }

    ctx.data = await stripe.charges.create(chargeInfo)
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'post'
  }

  get propTypes () {
    return {
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      accountID: PropTypes.string.isRequired,
      source: PropTypes.string,
    }
  }
}





module.exports = CreateTransactionEndpoint
