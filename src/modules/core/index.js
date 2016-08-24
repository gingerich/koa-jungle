import { default as modules, Module } from 'koa-module'

export class CoreModule extends Module {

  get name () {
    return 'core'
  }

  get dirname () {
    return __dirname
  }

}

export default modules.register((app, config) => new CoreModule(app, config))
