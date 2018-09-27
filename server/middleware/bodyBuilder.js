module.exports = () => async (ctx, next) => {
  const body = {
    links: {},
    meta: {
      start_ms: Date.now()
    }
  }

  await next()

  if (ctx.errors) {
    body.errors = ctx.errors
  } else {
    body.data = ctx.data

    if (Array.isArray(body.data)) {
      body.meta.count = body.data.length
    }
  }

  body.meta.end_ms = Date.now()
  body.meta.response_ms = (body.meta.end_ms - body.meta.start_ms)

  ctx.body = body
}
