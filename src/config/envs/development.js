import { resolve } from 'path'

export default {
  http: {
    port: 3030,
    hostname: 'localhost',
    url: 'http://localhost:3030'
  },
  paths: {
    runtime: './src'
  },
  auth: {
    jwt: {
      secretOrKey: 'secret'
    }
  }
}
