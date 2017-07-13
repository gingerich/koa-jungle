import { Component } from 'koach'

export default class ErrorMiddleware extends Component {

  compose () {
    return async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
      }
    }
  }

}
