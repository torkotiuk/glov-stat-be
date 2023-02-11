const products = require('../../data/products');

const getAll = (req, res) => {
  res.json(products);
};

module.exports = getAll;
