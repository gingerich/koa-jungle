import { Component, Module } from 'koach'
import { resolve } from 'path'
import { Logger, transports } from 'winston'

import body from 'koa-bodyparser'
import compress from 'koa-compress'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import favicon from 'koa-favicon'
import helmet from 'koa-helmet'
import morgan from 'koa-morgan'
import responseTime from 'koa-response-time'
import Socket from 'koach-socket'

import Core from './modules/core'
import Auth from './modules/auth'
import Users from './modules/user'

export default class Jungle extends Component {

  constructor (config, context) {
    super(config, context)

    this.context.attach('log', () => {
      const opts = this.config('winston')
      return new Logger(opts)
        .add(transports.Console, opts)
    })
  }

  path (path) {
    return resolve(this.config('paths.root'), this.config('paths.runtime'), path)
  }

  compose () {
    return Module.spec()

      .use(responseTime())

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

      // Enable websockets
      .use(Socket.spec(this.config('sockets')))

      .use(Core.spec(this.config('core')))

      .use(Auth.spec(this.config('auth')))

      .use(Users.spec())

      .use(this.config.subcomponents)
  }

}
