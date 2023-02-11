const products = require('../../data/products');

const getById = (req, res) => {
  const { id } = req.params;

  const oneProduct = products.find(item => item.id === id);

  if (!oneProduct) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Item with id "${id}" not found`,
    });
    return;
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result: oneProduct },
  });
};

module.exports = getById;
