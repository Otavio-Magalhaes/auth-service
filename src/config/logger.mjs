import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "debug", //ambiente de desenvolvimento, tenho que lembrar de mudar para info quando finalizar o authService.
  format: format.combine(
    format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    format.errors({stack: true}),
    format.printf(({timestamp,level, message, stack})=>{
      return `${timestamp} [${level.toLocaleUpperCase()}]: ${stack || message}`;
    })
  ),
  transports: [ 
    new transports.Console(),
    new transports.File({filename: "logs/error.log", level: "error"}),
    new transports.File({filename: "logs/combined.log"})
  ]
})

export default logger