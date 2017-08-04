import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

export default function (app, config) {
  app.use(passport.initialize())

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    // look up user
    done(null, { id: 1, username: 'foo', email: 'foo@bar.com' })
  })

  const localStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    try {
      const user = { id: 1, username: 'foo', email: 'foo@bar.com', validatePassword: pass => pass === '123' } // await User.findOne({ username })
      if (!user) { return done(null, false) }

      try {
        const isMatch = user.validatePassword(password)

        if (!isMatch) { return done(null, false) }

        done(null, user)
      } catch (err) {
        done(err)
      }
    } catch (err) {
      return done(err)
    }
  })

  passport.use('local', localStrategy)

  const { secret, token } = config.jwt
  const jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  const jwtStrategy = new JwtStrategy({
    jwtFromRequest,
    secretOrKey: secret,
    ...token
  }, (payload, done) => {
    // User.findOne({ email: payload.sub })
    done(null, { decoded_token: payload })
  })

  passport.use('jwt', jwtStrategy)

  return passport
}
