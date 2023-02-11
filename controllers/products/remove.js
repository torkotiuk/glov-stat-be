const products = require('../../data/products');

const remove = (req, res) => {
  const { id } = req.params;

  const index = products.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Item not fount',
    });
  }

  products.splice(index, 1);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Item was removed successfully',
  });
};

module.exports = remove;
