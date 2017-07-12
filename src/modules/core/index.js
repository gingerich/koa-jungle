import modules, { Module } from 'koa-module'

export class CoreModule extends Module {

  constructor (application, config) {
    super(application, Object.assign({ name: 'core' }, config))
  }

  get dirname () {
    return __dirname
  }

}

export default modules.register((app, config) => new CoreModule(app, config))
