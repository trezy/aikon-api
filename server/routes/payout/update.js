// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')





class UpdatePayoutEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (params) {
    const {
      data: { object },
      type: eventType,
    } = params

    if (['charge.updated', 'charge.succeeded'].includes(eventType)) {
      const transaction = object
      const {
        paid,
        readyToPay,
      } = transaction.metadata

      if (readyToPay && !paid) {
        const {
          amount,
          destinationAccountID,
          destinationPayoutMethodID,
          id,
        } = transaction

        await stripe.transfers.create({
          amount,
          currency: 'usd',
          destination: destinationAccountID,
        })

        await stripe.payouts.create({
          amount,
          currency: 'usd',
          destination: destinationPayoutMethodID,
          metadata: { transaction: id },
          method: 'instant',
        }, {
          stripe_account: destinationAccountID,
        })
      }
    }

    if (eventType === 'payout.created') {
      const payout = object
      const transaction = await stripe.charges.retrieve(payout.metadata.transaction)

      await stripe.charges.update(transaction.id, {
        metadata: {
          ...transaction.metadata,
          paid: true,
        },
      })
    }
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'post'
  }

  get url () {
    return '/update'
  }
}





module.exports = UpdatePayoutEndpoint
