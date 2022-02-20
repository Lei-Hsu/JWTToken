import { NextFunction, Request, Response } from 'express';

import { ErrorHandler } from '../../utilities/errorHandling';

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require("../models/User");

const checkAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.body = await User.findById(decoded.id).select('email userName image')

      next()
    } catch (error: any) {
      ErrorHandler(res, 'Invalid JWT token', 401)
    }
  }
  if (!token) {
    ErrorHandler(res, 'Do not has Auth')

  }
})

module.exports = {
  checkAuth
};