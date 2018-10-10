// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class CreatePayoutEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const {
      amount,
      accountID,
      transactionID,
    } = params

    let transaction = await stripe.charges.retrieve(transactionID)

    if (transaction.metadata.readyToPay === 'false') {
      transaction = await stripe.charges.update(transactionID, {
        metadata: {
          ...transaction.metadata,
          amount,
          accountID,
          readyToPay: true,
        },
      })
    }

    ctx.data = transaction
    ctx.status = 202
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
      transactionID: PropTypes.string.isRequired,
    }
  }

  get url () {
    return '/:accountID/:transactionID'
  }
}





module.exports = CreatePayoutEndpoint
