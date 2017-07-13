import nconf from 'nconf'
import defaults from './envs/default'

const env = process.env.NODE_ENV || 'development'

function Config () {
  this.store = new nconf.Provider()
    .argv()
    .env()
    .overrides(require(`./envs/${env}.js`))
    // .file({ file: `${__dirname}/envs/${env}.json` })
    // .file('defaults', { file: `${__dirname}/envs/defaults.json` })
    .defaults(defaults)
}

Config.prototype.get = function get (key) {
  return this.store.get(key)
}

export default new Config()
export { Config as Provider }
