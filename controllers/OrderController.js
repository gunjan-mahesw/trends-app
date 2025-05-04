const order= require('../models/order');
const Product = require('../models/Product');
exports.createOrder=async(req,res)=>{
    try{
        const{products,totalAmount}=req.body;   
        let orderProducts=[];
        for(let item of products){
            const product=await Product.findById(item.product);
            if(!product){
                return res.status(404).json({
                    success:false,
                    message:"Product not found"
                });
            }
            orderProducts.push({
                product:item.product,
                status:item.status,
                totalAmount:item.totalAmount
            });

        }
        const newOrder=await order.create({
            user:req.user._id,
            products:orderProducts,
            totalAmount
        });
        const saveOrder=await newOrder.save();
        res.status(201).json({
            success:true,
            message:"Order created successfully",
            order:saveOrder
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to create order",
            error:error.message
        });
    }
}
exports.getOrders=async(req,res)=>{
    try{
        const orders=await order.find({user:req.user._id}).populate('products.product','name price image').populate('user','name email');
        res.status(200).json({
            success:true,
            orders
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch orders",
            error:error.message
        });
    }
}
exports.getOrderById=async(req,res)=>{
    try{
        const {id}=req.params;
        const orderDetails=await order.findById(id).populate('products.product','name price image').populate('user','name email');
        if(!orderDetails){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }
        res.status(200).json({
            success:true,
            order:orderDetails
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch order",
            error:error.message
        });
    }
}
