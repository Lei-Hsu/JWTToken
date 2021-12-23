const Product = require('../models/Product')

const addProduct = (req, res) => {
  const postProduct = new Product({
    bedrooms: 124124,
    beds: 124214
  })

  postProduct.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

const findProduct = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

module.exports = {
  addProduct,
  findProduct
}