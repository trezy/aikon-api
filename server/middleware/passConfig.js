// Component imports
const config = require('../config')





module.exports = () => async (ctx, next) => {
  ctx.config = config

  await next()
}
