import { body, matchedData, validationResult } from "express-validator"

export const validateRequest = (request, response, next)=>{
  const result = validationResult(request)
  if(!result.isEmpty()) 
    return response.status(400).send(result.array())

  request.validate = matchedData(request, ['body'])
  next()
}