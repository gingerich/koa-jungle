import Koach from 'koach'

export default class UsersController extends Koach.Controller {
  get (ctx) {
    ctx.body = ctx.user.public()
  }

  post (ctx) {
    // const { username, password } = ctx.params
    // User.create()
    ctx.status = 201
  }

  put (ctx) {
    ctx.assert(ctx.state.user, 401, 'No authenticated user')
    // Modify ctx.user
    // ctx.user.save()
    ctx.status = 200
  }

  delete (ctx) {
    ctx.assert(ctx.state.user, 401, 'No authenticated user')

  }
}
