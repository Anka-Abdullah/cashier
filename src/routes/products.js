const express = require('express');
const router = express.Router();
const { verifyAcces } = require('../midleware/auth')
const multer = require('../midleware/multer')
const productController = require('../controllers/products')

router
    .get('/:id', verifyAcces,
        productController.getProductById)
    .get('/', verifyAcces,
        productController.getAllProducts)
    .post('/', verifyAcces,
        multer.upload.single('image'),
        productController.insertProduct)
    .patch('/:id', verifyAcces,
        multer.upload.single('image'),
        productController.updateProduct)
    .delete('/:id', verifyAcces,
        productController.deleteProduct)

module.exports = router