const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    //setting default values
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'something went wrong, try again later'
  }


  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map(item=>item.message).join(',')
    customError.statusCode = 400
  }

  if(err.code && err.code == 11000){
    customError.msg = `Given email ${err.keyValue.email} is already registered.. use another email`
    customError.statusCode = 400
  }

  if(err.name === 'CastError'){
    customError.msg = `no job with id ${err.value}`
    customError.statusCode = 400
  }
  return res.status(customError.statusCode).json({ msg:customError.msg })
return res.status(400).json({status:err.statusCode})
}

module.exports = errorHandlerMiddleware
