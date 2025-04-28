export const errorHandler = (err, request, response, next) =>{
  console.error(err)

  const statusCode = err.statusCode || 500
  const message = err.message || "Erro interno do Servidor"

  response.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  })
}