import jungle from '../index'
import config from '../config'

function main () {
  jungle()(config.get('app')).configure(config)
    .start(config.get('http:hostname'), config.get('http:port'))
}

// Catch unhandled rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise ', promise, ' reason: ', reason)
  throw reason
})

main()
