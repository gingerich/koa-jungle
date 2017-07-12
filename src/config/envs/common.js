import { normalize } from 'path'

export default {
  app: {
    name: 'koa-jungle'
  },
  paths: {
    root: normalize(`${__dirname}/../../..`),
    modules: './modules'
  },
  modules: [
    {
      name: 'koa-module-socket',
      config: 'sockets',
      enabled: true
    },
    {
      name: 'koa-module-auth',
      config: 'auth',
      enabled: false
    },
    {
      name: 'core',
      path: '/status'
    }
  ],
  morgan: {
    format: 'combined'
  },
  sockets: {
    io: {}
  }
}
