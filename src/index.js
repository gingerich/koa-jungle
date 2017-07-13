import { Component, Module } from 'koach'
import { resolve } from 'path'

import body from 'koa-bodyparser'
import compress from 'koa-compress'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import favicon from 'koa-favicon'
import helmet from 'koa-helmet'
import morgan from 'koa-morgan'
import Socket from 'koach-socket'

import Core from './modules/core'

export default class Jungle extends Component {

  path (path) {
    return resolve(this.config('paths.root'), this.config('paths.runtime'), path)
  }

  compose () {
    return Module.spec()

      // HTTP request logging
      .use(morgan(this.config('morgan.format'), this.config('morgan.options')))

      // Request body parser
      .use(body())

      .use(compress())

      // Response caching using etag
      .use(conditional())
      .use(etag())

      // Simple security configuration
      .use(helmet())

      // Serve static favicon image
      .use(favicon(`${this.config('paths.root')}/static/favicon.ico`))

      .use(Core.spec(this.config('core')))

      // Enable websockets
      .use(Socket.spec(this.config('sockets')))

      .use(this.config.subcomponents)
  }

}
