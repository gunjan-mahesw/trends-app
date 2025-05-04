const express = require('express');
const { getAllProducts, getProductById, createProduct } = require('../controllers/ProductController');
const router = express.Router();
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
module.exports = router;