// Module imports
const twilio = require('twilio')





module.exports = () => async (ctx, next) => {
  ctx.twilio = twilio(ctx.config.twilio.accountSID, ctx.config.twilio.authToken)

  await next()
}
