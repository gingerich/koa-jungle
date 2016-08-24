export default function errorMiddlewareFactory (app) {
  app.controller('error', async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.throw(err.status, err.message, ctx.state)
    }
  })
}
