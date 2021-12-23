import { Request, Response } from "express";
const Product = require("../models/Product");

const addProduct = (req: Request, res: Response) => {
  const postProduct = new Product({
    bedrooms: 124124,
    beds: 124214,
  });

  postProduct
    .save()
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const findProduct = (req: Request, res: Response) => {
  Product.find()
    .then((result: any) => res.send(result))
    .catch((err: any) => console.log(err));
};

module.exports = {
  addProduct,
  findProduct,
};
