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
      customerID,
      source,
    } = params

    const chargeInfo = {
      amount,
      currency: 'usd',
      customer: customerID,
      metadata: {
        paid: false,
        readyToPay: false,
      },
    }

    if (source) {
      chargeInfo.source = source
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
      customerID: PropTypes.string.isRequired,
      source: PropTypes.string,
    }
  }
}





module.exports = CreateTransactionEndpoint
