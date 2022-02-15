import { Request, Response, NextFunction } from "express";

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
    } catch (error) {
      console.log(error)
      res.status(401)
      res.json({
        message: 'Auth fail',
      })
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Do not has Auth')
  }
})

module.exports = {
  checkAuth
};