import modules, { Application } from 'koa-module'
import { resolve } from 'path'
import nconf from 'nconf'

import configuration from '../lib/config'
import logger from '../lib/logger'

export default class App extends Application {

  constructor (opts, engine) {
    super(opts, engine)
    this.config = configuration()

    // Attach global logger
    this.log = logger(this.name, this.get('winston'))

    // this.bottle.service('config', function () { return config })
  }

  modules (path, ...moduleList) {
    this.engine.use(modules(this, { path, modules: moduleList }))
    return this
  }

  configure (config) {
    if (config instanceof nconf.Provider) {
      this.config = config
      return this
    }

    this.config = configuration()
    if (typeof config === 'object') {
      this.config.overrides(config)
    } else if (typeof config === 'function') {
      config(this.config)
    }

    return this
  }

  get (key) {
    return this.config.get(key)
  }

  path (path) {
    return resolve(this.get('paths:root'), this.get('paths:runtime'), path)
  }

  load () {
    return this
  }

}
