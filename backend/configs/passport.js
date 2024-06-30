const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
require("dotenv").config()
const { v4: uuidv4 } = require('uuid')
const User=require("..//model/user")
const {newToken}=require("..//utils/token")
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/auth/google/callback`
  },
   async function(accessToken, refreshToken, profile, cb) {
    // console.log(profile)
     let user=await User.findOne({
        where:{
            email:profile._json.email
        }
     })
     if(!user) {
        user=await User.create({email:profile._json.email,name:profile._json.name,password:uuidv4(),image:profile._json.image,isVerifya:true})
     }
     const token=newToken(user)
     cb(null,{user,token})
  }
));

module.exports=passport