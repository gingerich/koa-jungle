import common from './envs/common'
import config from '../lib/config'

const env = process.env.NODE_ENV || 'development'
const envConfig = require(`./envs/${env}.js`)

const settings = config()
  .argv()
  .env()
  .overrides({
    ...envConfig,
    env
  })
  // .file({ file: `${__dirname}/envs/${env}.json` })
  // .file('common', { file: `${__dirname}/envs/common.json` })
  .defaults(common)

export default settings
