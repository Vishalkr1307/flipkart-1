const {body,validationResult}=require("express-validator")
const formatOferror=(errorOfArray)=>{
     return errorOfArray.map((err)=>{
        return err.msg
     })

}

const nameChain=()=>body("name").notEmpty().isString().withMessage("Name must be a string")
const emailChain=()=>body("email").notEmpty().isEmail().withMessage("Email must be a valid email")
const passwordChain=()=>body("password").notEmpty().isLength({min:8}).withMessage("Password must be at least 8 characters long")
const otpChain=()=>body("otp").notEmpty().isLength({min:4,max:4}).withMessage("OTP must be exactly 4 digits")

module.exports={nameChain,emailChain,passwordChain,formatOferror,otpChain}
