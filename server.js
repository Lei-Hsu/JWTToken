const express = require('express')
const mongoose = require('mongoose')

// read the env file
require('dotenv').config();

// routes
const productRoute = require('./Routes/productRoute')

const app = express()

// connect to mongodb
const dbUrl = process.env.DB_URL
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).
  then(() => {
    app.listen(3000)
    console.log('connected tp db')
  })
  .catch((err) => console.log(err))



// user routes
app.use('/product', productRoute)

