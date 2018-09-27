// Component imports
const BaseRoute = require('../../helpers/BaseRoute')
const SMSShape = require('../../shapes/sms')





class CreateSMSEndpoint extends BaseRoute {
  /***************************************************************************\
    Public methods
  \***************************************************************************/

  async handleRequest (ctx, params) {
    const {
      body,
      to,
    } = params
    const { twilio } = ctx

    ctx.data = await twilio.messages.create({
      body,
      from: ctx.config.twilio.from,
      to,
    })
  }




  /***************************************************************************\
    Getters
  \***************************************************************************/

  get method () {
    return 'post'
  }

  get propTypes () {
    return SMSShape
  }
}





module.exports = CreateSMSEndpoint
