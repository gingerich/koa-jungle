import { Component } from 'koach'

export default class AuthUser extends Component {

  compose () {
    return ctx => ctx.body = ctx.state.user
  }

}
