const express=require("express")
const router=express.Router()
const {}=require("..//utils/valdation")
const authonication=require("..//middleware/authonicate")
const {uploadSingle}=require("..//middleware/upload")
const {addProduct,getProduct,singleProduct,updateProduct,deleteProduct}=require("..//controller/product")
const authorize=require("..//middleware/authorize")

router.post("/addProduct",authonication,authorize(["admin"]),uploadSingle("image"),addProduct)
router.get("/getProduct",authonication,getProduct)
router.get("/getProduct/:id",authonication,singleProduct)
router.put("/updateProduct/:id",authonication,authorize(["admin"]),updateProduct)
router.put("/updateProduct/:id",authonication,authorize(["admin"]),updateProduct)
router.delete("/deleteProduct/:id",authonication,authorize(["admin"]),deleteProduct)


module.exports=router