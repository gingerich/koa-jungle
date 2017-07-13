import { Component, Router } from 'koach'
import StatusHandler from './controllers/status'
import ErrorHandler from './middleware/error'

export default class CoreModule extends Component {

  componentWillMount () {
    const { context: app } = this
    app.use(ErrorHandler.compose())
  }

  compose () {
    return Router.spec()
      .get('/status', StatusHandler.spec())
  }

}
