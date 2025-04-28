class ApiError extends Error {
  constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends ApiError{
  constructor(message= "Not Found"){
    super(message, 404)
  }
} 

export class ValidationError extends ApiError{
  constructor(message= "Validation Error"){
    super(message, 400)
  }
}

export class AuthError extends ApiError{ 
  constructor(message = "User Not Found."){
    super(message, 401)
  }
}

