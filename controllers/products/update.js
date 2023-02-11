const products = require('../../data/products');

const update = (req, res) => {
  const { id } = req.params;

  const index = products.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Item not fount',
    });
  }

  products[index] = { ...req.body, id: id };

  res.json({
    status: 'success',
    code: 200,
    data: { result: products[index] },
  });
};

module.exports = update;
