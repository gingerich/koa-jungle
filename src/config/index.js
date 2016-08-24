const env = process.env.NODE_ENV || 'development'
const config = require(`./envs/${env}.js`)

import common from './envs/common.js'
import nconf from 'nconf'

nconf
  .argv()
  .env()
  .overrides({
    ...config,
    env
  })
  // .file({ file: `${__dirname}/envs/${env}.json` })
  // .file('common', { file: `${__dirname}/envs/common.json` })
  .defaults(common)

export default nconf
