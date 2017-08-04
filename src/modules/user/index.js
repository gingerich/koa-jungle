import Koach, { Router } from 'koach'

import AccountController from './controllers/Account'
import UsersController from './controllers/Users'
import { authenticate } from '../auth'

export default class User extends Koach.Component {
  compose () {
    return Router.spec()
      // .param('userId', )
      .use(authenticate('jwt').except({ method: 'POST', path: '/users' }))
      .all('/users/:userId?', UsersController.spec())
      .all('/me', AccountController.spec())
  }
}
