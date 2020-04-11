const { createLogger, format, transports } = require('winston');
const { combine, prettyPrint } = format;
const path = require('path');

const errorLog = path.join(__dirname, '../logs/error.log');
const infoLog = path.join(__dirname, '../logs/info.log');

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: errorLog,
      level: 'error',
      format: combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.uncolorize(),
        prettyPrint()
      )
    }),
    new transports.File({
      filename: infoLog,
      level: 'info',
      format: combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.uncolorize(),
        prettyPrint()
      )
    })
  ]
});

module.exports = logger;
