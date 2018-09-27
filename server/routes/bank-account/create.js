// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')
const BankAccountShape = require('../../shapes/bankAccount')





class CreateBankAccountEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const { customerID } = params

    const bankAccountInfo = { ...params }
    delete bankAccountInfo.customerID

    ctx.data = await stripe.customers.createSource(customerID, {
      source: {
        ...bankAccountInfo,
        object: 'bank_account',
      }
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
      ...BankAccountShape,
      customerID: PropTypes.string
    }
  }

  get url () {
    return '/:customerID'
  }
}





module.exports = CreateBankAccountEndpoint
