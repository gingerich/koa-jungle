import 'babel-regenerator-runtime' // Silly hack to make generator transpilation work
import body from 'koa-bodyparser'
import compress from 'koa-compress'
import conditional from 'koa-conditional-get'
import convert from 'koa-convert'
import etag from 'koa-etag'
import favicon from 'koa-favicon'
import helmet from 'koa-helmet'
import modules from 'koa-module'
import morgan from 'koa-morgan'

import config from 'config'
import App from 'lib/app'

function main () {
  const app = new App(config.get('app'))

  // HTTP request logging
  app.use(morgan(config.get('morgan:format'), config.get('morgan:options')))

  // Request body parser
  app.use(body())

  app.use(compress())

  // Response caching using etag
  app.use(convert(conditional()))
  app.use(convert(etag()))

  // Simple security configuration
  app.use(helmet())

  // Serve static favicon image
  const rootPath = config.get('paths:root')
  app.use(favicon(`${rootPath}/static/favicon.ico`))

  // Mount modules
  const opts = {
    modules: config.get('modules:enabled'),
    path: app.path(config.get('paths:modules'))
  }
  app.use(modules(app, opts))

  // Kick off the server!
  app.start(config.get('http:hostname'), config.get('http:port'))
}

// Catch unhandled rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise ', promise, ' reason: ', reason)
  throw reason
})

main()
