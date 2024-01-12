import { createLogger, transports, format } from "winston";

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
};

const logger = new createLogger({
  format: format.combine(
    format.timestamp({ format: timezoned }),
    format.printf((info) => {
      return `${info.timestamp} [${info.level}]  ${JSON.stringify(
        info.message
      )}`;
    })
  ),
  transports: [
    new transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
      format: format.printf((info) => {
        return `${info.timestamp} [${info.level}] : ${JSON.stringify(
          info.message
        )}`;
      }),
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

export default logger;
