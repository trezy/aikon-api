// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class RefundTransactionEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const {
      amount,
      chargeID,
      reason,
    } = params

    const refundInfo = { charge: chargeID }

    if (amount) {
      refundInfo.amount = amount
    }

    if (reason) {
      refundInfo.reason = reason
    }

    console.log('refundInfo', refundInfo)

    ctx.data = await stripe.refunds.create(refundInfo)
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'put'
  }

  get propTypes () {
    return {
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      chargeID: PropTypes.string.isRequired,
      reason: PropTypes.oneOf(['duplicate', 'fraudulent', 'requested_by_customer']),
    }
  }

  get url () {
    return '/:chargeID/refund'
  }
}





module.exports = RefundTransactionEndpoint
