const express = require('express');
const { check } = require('express-validator');
const productController = require('../controllers/productController');
const hasRole = require('../middleware/roleAuth');
const router = express.Router();

// Regular user-accessible routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Admin-accessible routes
router.post('/', [
  check('title', 'Title is required').not().isEmpty(),
  check('price', 'Price must be a valid number').isFloat({ gt: 0 })
], productController.createProduct);
router.put('/:id', [
  check('title', 'Title is required').not().isEmpty(),
  check('price', 'Price must be a valid number').isFloat({ gt: 0 })
], productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Subscriber-only product access routes
// INPUT_REQUIRED {Define routes that are available only for subscribers, for example, a route to access premium products.}

module.exports = router;