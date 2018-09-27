// Module imports
const stripe = require('stripe')





module.exports = () => async (ctx, next) => {
  ctx.stripe = stripe(ctx.config.stripe.secret)

  await next()
}
