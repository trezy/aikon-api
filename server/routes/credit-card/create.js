// Module imports
const PropTypes = require('prop-types')





// Component imports
const BaseRoute = require('../../helpers/BaseRoute')
const CreditCardShape = require('../../shapes/creditCard')





class CreateCreditCardEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const { stripe } = ctx
    const { customerID } = params

    const creditCardInfo = { ...params }
    delete creditCardInfo.customerID

    ctx.data = await stripe.customers.createSource(customerID, {
      source: {
        ...creditCardInfo,
        object: 'card',
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
      ...CreditCardShape,
      customerID: PropTypes.string,
    }
  }

  get url () {
    return '/:customerID'
  }
}





module.exports = CreateCreditCardEndpoint
