import { Component, Module, Router } from 'koach'
import passport from './lib/passport'
import AuthUser from './controllers/AuthUser'
import GetToken from './controllers/GetToken'
import PassportAuth from './middleware/PassportAuth'
import CreateToken from './middleware/CreateToken'

const passportJwt = PassportAuth.authenticate('jwt', { session: false })
  .except([{
    method: 'POST',
    path: /\/auth$/
  }, {
    path: [/\/status$/]
  }])

export default class AuthModule extends Component {

  constructor (config, context) {
    super(config, context)

    const passportInstance = passport(this.context, this.config)
    this.context.attach('passport', () => passportInstance)
  }

  componentWillMount () {
    const { context: app } = this

    // app.use(passportJwt) // ??
  }

  compose () {
    return Module.spec()
      .use(
        Router.spec()
          .post('/auth', PassportAuth.authenticate('local'), CreateToken.spec(this.config('jwt')), AuthUser.spec())
          .get('/token', passportJwt, GetToken.spec())
      )
      .use(this.config.subcomponents)
  }

}

export { PassportAuth }
export function authenticate (name, opts) {
  return PassportAuth.authenticate(name, opts)
}
