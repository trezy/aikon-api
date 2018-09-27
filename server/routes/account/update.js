// Component imports
const BaseRoute = require('../../helpers/BaseRoute')
const AccountShape = require('../../shapes/account')





class UpdateCustomerEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const { id } = params

    const accountUpdates = { ...params }
    delete accountUpdates.customer
    delete accountUpdates.id

    if (accountUpdates.external_account) {
      accountUpdates.external_account = {
        ...accountUpdates.external_account,
        object: 'bank_account',
      }
    }

    const customerUpdates = { ...params.customer }

    const account = await stripe.accounts.update(id, accountUpdates)
    const customer = await stripe.customers.update(account.metadata.customer, customerUpdates)

    ctx.data = {
      ...account,
      customer,
    }
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get defaultProps () {
    return {
      legal_entity: {
        type: 'individual',
      },
    }
  }

  get method () {
    return 'put'
  }

  get propTypes () {
    return AccountShape
  }

  get url () {
    return '/:id'
  }
}





module.exports = UpdateCustomerEndpoint
