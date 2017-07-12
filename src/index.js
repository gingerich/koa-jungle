import 'babel-regenerator-runtime' // Silly hack to make generator transpilation work
import body from 'koa-bodyparser'
import compress from 'koa-compress'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import favicon from 'koa-favicon'
import helmet from 'koa-helmet'
import morgan from 'koa-morgan'

import settings from './config'
import App from './lib/app'

const DEFAULTS = {}

class JungleCore extends App {
  get (key) {
    return this.config.get(key) || settings.get(key)
  }
}

export default () => Object.assign((options = {}) => {
  Object.assign(options, DEFAULTS, options)
  // const app = new App(options)
  const jungle = new JungleCore(options) // settings.get('app'))

  // HTTP request logging
  jungle.use(morgan(settings.get('morgan:format'), settings.get('morgan:options')))

  // Request body parser
  jungle.use(body())

  jungle.use(compress())

  // Response caching using etag
  jungle.use(conditional())
  jungle.use(etag())

  // Simple security configuration
  jungle.use(helmet())

  // Serve static favicon image
  const rootPath = settings.get('paths:root')
  jungle.use(favicon(`${rootPath}/static/favicon.ico`))

  // Mount modules
  const path = jungle.path(settings.get('paths:modules'))
  jungle.modules(path, ...settings.get('modules').filter(m => m.enabled !== false))

  return jungle // app.use(jungle)
}, {
  paths: [],
  dependencies: []
})

export { default as config } from './lib/config'
export { App as Jungle }
