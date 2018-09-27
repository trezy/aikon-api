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
    const {
      amounts,
      bankAccountID,
      customerID,
    } = params

    ctx.data = await stripe.customers.verifySource(customerID, bankAccountID, { amounts })
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'post'
  }

  get propTypes () {
    return {
      amounts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      bankAccountID: PropTypes.string,
      customerID: PropTypes.string,
    }
  }

  get url () {
    return '/:customerID/:bankAccountID/verify'
  }
}





module.exports = CreateBankAccountEndpoint
