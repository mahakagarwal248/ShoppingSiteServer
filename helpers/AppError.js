/* It's a subclass of Error that adds a statusCode property */
class AppError extends Error {
    constructor (message, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;
  