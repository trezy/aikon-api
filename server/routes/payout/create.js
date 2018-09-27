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
      destinationAccountID,
      destinationPayoutMethodID,
      transactionID,
    } = params

    const transaction = await stripe.charges.retrieve(transactionID)

    if (!transaction.metadata.readyToPay) {
      await stripe.charges.update(transactionID, {
        metadata: {
          amount,
          destinationAccountID,
          destinationPayoutMethodID,
          paid: false,
          readyToPay: true,
        },
      })
    }

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
      destinationAccountID: PropTypes.string.isRequired,
      destinationPayoutMethodID: PropTypes.string.isRequired,
      transactionID: PropTypes.string.isRequired,
    }
  }

  get url () {
    return '/:destinatiPayoutMethod/:destinationBankAccountID/:transactionID'
  }
}





module.exports = CreatePayoutEndpoint
