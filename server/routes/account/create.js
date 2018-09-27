// Component imports
const BaseRoute = require('../../helpers/BaseRoute')
const AccountShape = require('../../shapes/account')





class CreateCustomerEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx

    const customer = await stripe.customers.create({})

    ctx.data = await stripe.accounts.create({
      ...params,
      payout_schedule: {
        delay_days: 'minimum',
        interval: 'manual',
      },
      metadata: { customer: customer.id },
      type: 'custom',
    })

    ctx.data.customer = customer
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
