const Product = require('../models/mydataSchema');
const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
      }catch(error){
        res.status(500).json({message:error.message});
      }
}

const getProduct = async(req,res)=>{
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        console.error(`Error retrieving product with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to retrieve product' });
      }
}
const createProduct = async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
      }catch(error){
        res.status(500).json({message:error.message});
      }
}
const updateProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
          return res.status(404).json({message:"Product not found"})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
      }catch(error){
        res.status(500).json({message:error.message});
      }
}
const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
          return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({message:"Product deleted successfully"});
      }catch{
        res.status(500).json({message:error.message});
      }
}
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}