const express = require('express');
const {createProduct,updateProduct,getAllProducts,getProductById} = require('../controller/shippingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/create', createProduct);
router.get('/get', getAllProducts);
router.get('/get/:id', getProductById);
router.put('/cancel', updateProduct);

module.exports = router;
