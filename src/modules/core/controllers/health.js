export default function healthControllerFactory (app) {
  app.controller('health', (ctx, next, context) => {
    ctx.status = 200
    ctx.body = 'healthy'
  }, 'context')
}
