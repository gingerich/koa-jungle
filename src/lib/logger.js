import { Logger as WinstonLogger, transports as winstonTransports } from 'winston'

const privates = new WeakMap()

class Logger {
  constructor (prefix, options) {
    const logger = new WinstonLogger(options)
    logger.add(winstonTransports.Console, options)
    privates.set(this, { prefix, options, logger })
  }

  log (method, ...args) {
    const { logger, prefix } = privates.get(this)
    logger[method](prefix, ...args)
  }

  error (...args) {
    this.log('error', ...args)
  }

  warn (...args) {
    this.log('warn', ...args)
  }

  info (...args) {
    this.log('info', ...args)
  }

  debug (...args) {
    this.log('debug', ...args)
  }

  silly (...args) {
    this.log('silly', ...args)
  }
}

function loggerFactory (...args) {
  return new Logger(...args)
}

export default loggerFactory
export { Logger as Logger }
