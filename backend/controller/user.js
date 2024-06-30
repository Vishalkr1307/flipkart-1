const User=require("../model/user")
const Otp=require("../model/otp")
const {validationResult}=require("express-validator")
const {formatOferror}=require("../utils/valdation")
const {newToken,verifyaToken}=require("../utils/token")
const bcrypt=require("bcrypt")
const sentMail=require("../utils/sentMail")
const Register=async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOferror(error.array()).join(","))
        }
        let user=await User.findOne({
            where:{
                email:req.body.email
            }
        })
        if(user){
            return res.status(401).send("User already exists")
        }
        user=await User.create(req.body)
        return res.status(201).json(user)


    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const Login=async (req,res)=>{
    try{

        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOferror(error.array()).join(","))

        }
        const user=await User.findOne({
            where:{
                email:req.body.email
            }
        })
        if(!user){
            return res.status(401).send("User not found")
        }
        const matchPassword=bcrypt.compareSync(req.body.password,user.password)
        if(!matchPassword){
            return res.status(401).send("Invalid password")
        }

        const sendData=await sentMail(user.email)
        return res.status(200).send(sendData)

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const OtpVerification=async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOferror(error.array()).join(","))

        }
        const otp=await Otp.findAll({
            where:{
                userId:req.params.id
            }
        })
        if(otp.length===0){
            return res.status(401).send("Invalid Data")
        }
        const hashOtp=otp[otp.length-1].otp
        const expiredAt=otp[otp.length-1].expiredAt
        console.log(new Date(expiredAt).getTime(),new Date().getTime())

        if(new Date(expiredAt).getTime()>new Date().getTime()){
            await Otp.destroy({
                where:{
                    userId:req.params.id
                }
            })
            return res.status(401).send("OTP expired")
        }
        else{
            const matchOtp=bcrypt.compareSync(req.body.otp,hashOtp)
            
            if(!matchOtp){
                return res.status(401).send("Invalid OTP")
            }


            await Otp.destroy({
                where:{
                    userId:req.params.id
                }
            })
            await User.update({isVerifya:true},{
                where:{
                    id:req.params.id
                }
            })
            const user=await User.findByPk(req.params.id)
            const token=newToken(user)
            return res.status(200).json({user,token})
        }
        

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const ResendOtp=async(req,res)=>{
    try{
        const user=await User.findByPk(req.params.id)
        if(!user){
            return res.status(401).send("User not found")
        }
        
        const sendData=await sentMail(user.email)
        return res.status(200).send(sendData)

    }
    catch(err){
       return res.status(500).json({message:err.message})
    }
}

const ForgetPassword=async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOferror(error.array()).join(","))
        }
        let user=await User.findOne({
            where:{
                email:req.body.email
            }
        })
        if(!user){
            return res.status(401).send("User not found")
        }
        const sendData=await sentMail(user.email)
        return res.status(200).send(sendData)

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

const ResetPassword=async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOferror(error.array()).join(","))
        }
        await User.update({password:req.body.password},{
            where:{
                id:req.params.id
            }
        })
        return res.status(200).send("Password reset successfully")

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports={Register,Login,OtpVerification,ResendOtp,ForgetPassword,ResetPassword}