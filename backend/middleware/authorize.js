module.exports=(permittedRole)=>{
    return (req,res,next)=>{
        const user=req.user;
        console.log(permittedRole)
        if(permittedRole.includes(user.role)){
            next()
        }
        else{
            return res.status(401).send("Unauthorized access of user") 
        }

    }
}