import Koa from 'koa'
import { Application } from 'koa-module'
import { resolve } from 'path'

import config from 'config'
import logger from 'lib/logger'

export default class App extends Application {

  constructor (opts, engine) {
    super(null, opts)
    this.name = opts.name

    this.engine = engine || new Koa()

    // Attach global logger
    this.log = logger(this.name, config.get('winston'))

    this.modules = {}

    // this.bottle.service('config', function () { return config })
  }

  context () {
    return this
  }

  // get config () {
  //   return config.get()
  // }

  // set config () {

  // }

  get (key) {
    return config.get(key)
  }

  path (path) {
    return resolve(config.get('paths:runtime'), path)
  }

}
