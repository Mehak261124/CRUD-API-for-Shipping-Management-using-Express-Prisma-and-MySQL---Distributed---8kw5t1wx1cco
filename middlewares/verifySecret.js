const SHIPPING_SECRET_KEY = "a1b2c3d4e5f67890123456789abcdef";

const authMiddleware = (req, res, next) => {
  const shippingSecretKey = req.headers["shipping_secret_key"];

  if (!shippingSecretKey) {
    return res.status(403).json({ error: "SHIPPING_SECRET_KEY is missing" });
  }

  if (shippingSecretKey !== SHIPPING_SECRET_KEY) {
    return res.status(403).json({ error: "Failed to authenticate SHIPPING_SECRET_KEY" });
  }

  next();
};

module.exports = authMiddleware;
