const {prisma} = require('../db/config');

const createProduct = async (req, res) => {
  try {
    const { userId, productId, count } = req.body;

    if (!userId || !productId || count == null) {
      return res.status(404).json({ error: "All fields required" });
    }

    const product = await prisma.shipping.create({
      data: { userId, productId, count, status: "pending" },
    });

    return res.status(201).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { shippingId } = req.body;

    if (!shippingId) {
      return res.status(404).json({ error: "Missing shippingId" });
    }

    const updatedProduct = await prisma.shipping.update({
      where: { id: parseInt(shippingId) },
      data: { status: "cancelled" },
    });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const userId = req.query.userId;

    const products = userId
      ? await prisma.shipping.findMany({ where: { userId: parseInt(userId) } })
      : await prisma.shipping.findMany();

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {createProduct,updateProduct,getAllProducts}