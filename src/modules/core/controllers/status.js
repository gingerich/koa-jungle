import { Component } from 'koach'

export default class StatusHandler extends Component {

  compose () {
    return async (ctx, next) => {
      ctx.status = 200
      ctx.body = 'Healthy'
    }
  }

}
