const {prisma} = require('../db/config');

const createProduct = async (req,res) => {
  try{
    const {userId,productId,count} = req.body;
    if(!userId || !productId || count == null){
      return res.status(404).json({"error": "All fields required"})
    }

    const product = await prisma.shipping.create({
      data:{userId,productId,count},
    })
    return res.status(201).json({"id": id, 
    "userId": req.body.userId,
    "productId": req.body.productId , 
    "count": req.body.count, 
    "status": "pending" })
  }
catch(err){
  console.log(err);
  return res.status(500).json({"error": "Internal Server Error"})
}
}

const updateProduct = async (req,res) => {
  try{
    const {id} = req.params;
    const {userId,productId,count} = req.body;

    if(!id){
      return res.status(404).json({"error": "Missing shippingId"})
    }

    const updatedProduct = await prisma.shipping.update({
      where: {id : parseInt(id)},
      data:{userId,productId,count}
    })
    return res.status(200).json({"id": id, 
    "userId": req.body.userId,
    "productId": req.body.productId , 
    "count": req.body.count, 
    "status": "cancelled"})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({"error": "Internal Server Error"})
  }
}

const getAllProducts = async (req,res) => {
  try{
    const products = await prisma.shipping.findMany();
    return res.status(200).json(products)
  }
  catch(err){
    console.log(err);
    return res.status(500).json({"error": "Internal Server Error"})
  }
}

const getProductById = async (req,res) => {
  try{
    const {id} = req.params;

    const product = await prisma.shipping.findUnique({
      where: {id: parseInt(id)}
    });
  
    if(!product){
      return res.status(404).json({"error": "It is not same product that we required"})
    }
    return res.status(200).json(product);
  }
  catch(err){
    console.log(err);
    return res.status(500).json({"error": "Internal Server Error"})
  }

}

module.exports = {createProduct,updateProduct,getAllProducts,getProductById}