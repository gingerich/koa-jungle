import { normalize } from 'path'

export default {
  app: {
    name: 'koa-jungle'
  },
  paths: {
    root: normalize(`${__dirname}/../../..`),
    modules: './modules'
  },
  morgan: {
    format: 'combined'
  },
  sockets: {
    io: {}
  }
}
