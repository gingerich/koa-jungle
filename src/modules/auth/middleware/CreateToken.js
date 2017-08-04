import Koach from 'koach'
import jwt from 'jsonwebtoken'

export default class CreateToken extends Koach.Component {

  compose () {
    return (ctx, next) => {
      const { user } = ctx.state
      const { secret, token } = this.config
      user.token = jwt.sign(user, secret, {
        expiresIn: '7d', // default expiration
        ...token,
        subject: String(user.id)
      })
      // user.issueNewToken(secret, this.config)
      // user.save()
      next()
    }
  }

}
