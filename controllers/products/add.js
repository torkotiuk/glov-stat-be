const { v4 } = require('uuid');
const products = require('../../data/products');
const productSchema = require('../../utils/validate/product-joi');

const add = (req, res) => {
  const { error, value } = productSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      message: error.message,
    });
    return;
  }

  const newProduct = { ...req.body, _id: v4() };

  products.push(newProduct);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newProduct,
    },
  });
};

module.exports = add;
