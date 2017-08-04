import Koach from 'koach'

export default class GetToken extends Koach.Component {

  compose () {
    return ctx => ctx.body = ctx.state.user.decoded_token
  }

}
