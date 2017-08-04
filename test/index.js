import Koach from 'koach'
import Jungle from '../src'
import config from '../src/config'

class TestApp extends Koach.Component {

  compose () {
    return Jungle.spec(config.get())
  }

}

Koach.registerComponent('TestApp', () => TestApp)

Koach.listen(3030)
