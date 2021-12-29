const {createLogger, format, transports} = require('winston')
const logLevel = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
}
const logger = createLogger({
    transports: [
        new transports.File({filename: 'combined.log'})
    ]
})


module.exports = logger