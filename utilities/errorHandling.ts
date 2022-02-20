import { Response } from 'express';

/**
 * 
 * @param res Express's response
 * @param message Error Message
 * @param statusCode Response status code
 * @returns Response error message
 */
export const ErrorHandler = (res: Response, message: string, statusCode?: number) => {
  const resStatusCode = statusCode || 500
  const statusMessage = statusCode?.toString().startsWith('4') ? 'fail' : 'error'

  return res.status(resStatusCode).json({
    status: statusMessage,
    message
  })
}