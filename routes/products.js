const express = require('express');
const router = express.Router();
const { products } = require('../controllers');

router.get('/', products.getAll);
router.get('/:id', products.getById);
router.post('/', express.json(), products.add);
router.put('/:id', express.json(), products.update);
router.delete('/:id', products.remove);

module.exports = router;
