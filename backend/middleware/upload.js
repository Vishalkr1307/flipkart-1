const path=require("path")
const multer=require("multer")


const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,"..//uploads"))

    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const fileFilter=function (req,file,cb){
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png" || file.mimetype==="image/gif" || file.mimetype==="application/pdf"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }

}

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
 
})

const uploadSingle=(image_url)=>{
    return (req,res,next)=>{
        const uploadItems=upload.single(image_url)
        uploadItems(req,res,function(err){
            if(err instanceof multer.MulterError){
                return res.status(400).json({message:err.message,errorType:"MulterError"})
            }
            else if(err){
                return res.status(400).json({message:err.message,errorType:"GeneralError"})
            }
            else if(!req.file){
                return res.status(400).json({message:"No file uploaded",errorType:"NoFileError"})
            }
            else{
                next()
            }
        })

    }

}
module.exports={uploadSingle}