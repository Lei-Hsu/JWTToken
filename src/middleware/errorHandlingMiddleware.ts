import { NextFunction, Request, Response } from 'express';

const asyncHandler = require('express-async-handler')


const errorHandler = asyncHandler(async (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status.startsWith('4') ? 'fail' : 'error'

  console.log('middleware')

  res.status(err.statusCode).json({
    statue: err.statue,
    message: err.message
  })
  next()
})

module.exports = {
  errorHandler
}