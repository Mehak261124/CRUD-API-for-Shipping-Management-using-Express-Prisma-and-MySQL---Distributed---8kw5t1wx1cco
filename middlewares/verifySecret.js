const SHIPPING_SECRET_KEY = 'a1b2c3d4e5f67890123456789abcdef';

const authMiddleware = (req,res,next) => {
  const shippingAuthKey = req.headers['shippingAuthKey'];

  if(!shippingAuthKey){
    return res.status(403).json({"error": "SHIPPING_SECRET_KEY is missing or invalid"})
  }
  if(shippingAuthKey !== SHIPPING_SECRET_KEY){
    return res.status(403).json({"error": "Failed to authenticate SHIPPING_SECRET_KEY"})
  }

  next();
}

module.exports = authMiddleware;

