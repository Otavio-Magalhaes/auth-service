import logger from "../../config/logger.mjs"

export const errorHandler = (err, request, response, next) =>{
  logger.error(err)

  response.status(statusCode).json({
    error: {
      message: err.message || "erro do serivdor"
    },
  })
}