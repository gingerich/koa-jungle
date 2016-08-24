import { normalize, resolve } from 'path'

const rootPath = normalize(`${__dirname}/../../..`)
require('assert')(rootPath === process.cwd(), 'rootPath should match process.cwd()')

export default {
  app: {
    name: 'koa-jungle'
  },
  paths: {
    root: process.cwd(),
    runtime: resolve('dist'),
    modules: './modules'
  },
  modules: {
    enabled: [
      {
        name: 'koa-module-auth',
        config: 'auth'
      },
      {
        name: 'core'
      }
    ]
  },
  morgan: {
    format: 'combined'
  }
}
