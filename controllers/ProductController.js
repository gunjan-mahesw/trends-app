const product=require('../models/Product');
exports.createProduct=async(req,res)=>{
    try{
        const {name,description,price,image,category}=req.body;
        const newProduct=await product.create({name,description,price,image,category});
        res.status(201).json({
            success:true,
            message:"Product created successfully",
            product:newProduct
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to create product",
            error:error.message
        });
    }
}
exports.getAllProducts=async(req,res)=>{
    try{
        const products=await product.find();
        res.status(200).json({
            success:true,
            products
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch products",
            error:error.message
        });
    }
}
exports.getProductById=async(req,res)=>{
    try{
        const {id}=req.params;
        const productDetails=await product.findById(id);
        if(!productDetails){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }
        res.status(200).json({
            success:true,
            product:productDetails
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch product",
            error:error.message
        });
    }
}
