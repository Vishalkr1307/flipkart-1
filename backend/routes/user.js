const express=require("express")
const router=express.Router()
const User=require("..//model/user")
const passport=require("..//configs/passport")
const {Login,Register,OtpVerification,ResendOtp,ForgetPassword,ResetPassword}=require("..//controller/user")

const {formatOferror,emailChain,nameChain,passwordChain,otpChain}=require("..//utils/valdation")

passport.serializeUser(function ({user,token},done){
    done(null,user.id)

})
passport.deserializeUser(async function (id,done){
   let user=await User.findByPk(id)
   done(null,user)
})

router.post("/login",emailChain(),Login)
router.post("/register",nameChain(),emailChain(),passwordChain(),Register)
router.post("/otpverification/:id",otpChain(),OtpVerification)
router.get("/otpverification/resendotp/:id",ResendOtp)
router.post("/forgetpassword",emailChain(),ForgetPassword)
router.put("/forgetpassword/resetpassword/:id",passwordChain(),ResetPassword)

router.get('/google',
    passport.authenticate('google', { scope: ['profile','email'] }));
  
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      const {user,token}=req.user
      return res.status(200).send({user,token})
    });

module.exports=router
