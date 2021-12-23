const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  bedrooms: {
    type: Number,
    required: true
  },
  beds: {
    type: Number,
    required: true
  }
})

const Product = mongoose.model('listingsAndReviews', productSchema) // collection name
module.exports = Product