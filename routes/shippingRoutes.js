const express = require("express");
const { createProduct, updateProduct, getAllProducts } = require("../controller/shippingController");
const authMiddleware = require("../middlewares/verifySecret");
const router = express.Router();

router.use(authMiddleware);

router.post("/create", createProduct);
router.get("/get", getAllProducts);
router.put("/cancel", updateProduct);

module.exports = router;
