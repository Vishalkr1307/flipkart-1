const {verifyaToken}=require("..//utils/token")


module.exports=async (req,res,next)=>{
    if(!req.headers.authorization) return res.status(401).send("Unauthorized token")
    const bearerToken=req.headers.authorization
    if(!bearerToken.startsWith("Bearer ")){
        return res.status(401).send("Invalid token")
    }
    const token=bearerToken.split(" ")[1]
    let user;
      user=await verifyaToken(token)
      req.user=user.user
      next()

    


}