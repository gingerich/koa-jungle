import Koach from 'koach'

export default class AccountController extends Koach.Controller {
  get (ctx) {
    ctx.assert(ctx.state.user, 401, 'No authenticated user')
    ctx.body = ctx.state.user.format('owner')
  }

  put (ctx) {
    // Modify user settings
    ctx.status = 200
  }

  delete (ctx) {
    ctx.throw(400, 'Cannot delete account at this time')
  }
}

// format(User, 'id username -password', {
//   owner: '*',
//   public: '-token'
// })
