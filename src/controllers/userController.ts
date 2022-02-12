import { Request, Response } from "express";
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require("../models/User");

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

const singIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {

    if (!email || !password) {
      res.status(400)
      throw new Error('Please Enter Your Account Information')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(404)
      throw new Error('User Exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const userData = await User.create({
      email,
      password: hashPassword,
    })

    if (userData) {
      res.status(400)
      res.json({
        message: 'success',
        data: userData
      })
    }

  } catch (error) {
    res.status(404)
    res.json({
      message: 'fail',
      errorMessage: error
    })
  }
})

const findUser = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const userData = await User.findOne({ email })
    if (userData) {
      res.status(400)
      res.json({
        message: 'success',
        data: userData
      })
    } else {
      throw new Error('Can not find the user')
    }
  } catch (error) {
    res.status(404)
    res.json({
      message: 'fail'
    })
  }
})

const logIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) throw new Error('Email is not correct')

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200)
      res.json({
        message: 'success',
        data: {
          _id: user.id,
          email: user.email,
          JWTToken: generateToken(user.id)
        }
      })
    } else {
      throw new Error('Password is not correct')
    }
  } catch (error) {
    console.log('error', error)
    res.status(400)
    res.json({
      message: 'fail'
    })
  }
})

const check = asyncHandler(async (req: Request, res: Response) => {
  const userProfile = req.body
  res.status(200)
  res.json({
    message: 'success',
    data: {
      userProfile
    }
  })
})

module.exports = {
  singIn,
  findUser,
  logIn,
  check
};
