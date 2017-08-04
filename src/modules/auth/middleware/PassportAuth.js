import Koach from 'koach'

export default class PassportAuth extends Koach.Component {

  static authenticate (strategy, authOpts) {
    return PassportAuth.spec({ strategy, authOpts })
  }

  compose () {
    const { strategy, authOpts } = this.config
    return this.context.passport.authenticate(strategy, authOpts)
  }

}
