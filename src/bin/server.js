import Koach from 'koach'
import Jungle from '../'
import config from '../config'

Koach.registerComponent('Jungle', () => Jungle)

Koach.config(config.get())

Koach.listen(config.get('http:port'), config.get('http:hostname'))

// Catch unhandled rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise ', promise, ' reason: ', reason)
  throw reason
})
