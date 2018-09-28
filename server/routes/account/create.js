// Component imports
const BaseRoute = require('../../helpers/BaseRoute')
const AccountShape = require('../../shapes/account')





class CreateCustomerEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx

    const account = await stripe.accounts.create({
      ...params,
      payout_schedule: {
        interval: 'manual',
      },
      type: 'custom',
    })

    const customer = await stripe.customers.create({
      metadata: {
        accountID: account.id,
      },
    })

    ctx.data = await stripe.accounts.update(account.id, {
      metadata: {
        ...account.metadata,
        customerID: customer.id,
      },
    })
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'post'
  }

  get propTypes () {
    return AccountShape
  }
}





module.exports = CreateCustomerEndpoint
