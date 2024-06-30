const { Op } = require("sequelize");
const { Product, Rating, Comment } = require("../model/product");
const {get_async_connection,set_async_connection}=require("..//utils/reeds")

const addProduct = async (req, res) => {
    try {
        const user = req.user;
        
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        
        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            image: req.file.path, // Save the path of the uploaded image
            category: req.body.category,
            price: req.body.price,
            userId: user.id
        });
        
        return res.status(201).json({ message: "Product object created", product });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getProduct=async (req,res,next)=>{
    try{
        const user=req.user
        const replyProduct=await get_async_connection("product")
        if(replyProduct){
            return res.status(200).json({product:JSON.parse(replyProduct)})
        }
        const product=await Product.findAll()
        await set_async_connection("product",JSON.stringify(product),"EX",300)
        return res.status(200).json({product})



    }
    catch(err){
       return res.status(500).json({message:err.message})
    }
}

const singleProduct=async (req, res, next) => {
    try{
        const user=req.user
        const product=await Product.findOne({
            where:{
                id: req.params.id
            }
        })
        console.log(product)
        return res.status(200).json({product})

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

const updateProduct=async (req, res, next) => {
    try{
        const user=req.user
        const product=await Product.update(req.body,{
            where:{
                [Op.and]:[
                    {id:req.params.id},
                    {userId:user.id}
                ]
            }
        })
        return res.status(200).json({product})

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}
const deleteProduct=async (req, res, next) => {
    try{

        const user=req.user
        const product=await Product.destroy({
            where:{
                [Op.and]:[
                    {id:req.params.id},
                    {userId:user.id}
                ]
            }
        })
        return res.status(200).json({product})



    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports = { addProduct,getProduct,singleProduct,updateProduct,deleteProduct };
