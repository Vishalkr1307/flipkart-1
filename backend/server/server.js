const app=require("..//index")
const db=require("../configs/db")
const cluster=require("cluster")
const cpPlush=require("os").cpus().length

if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`)
    for(var i=0;i<cpPlush;i++){
        cluster.fork()
    }

    cluster.on("exit",(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()
    })
}
else{








require("dotenv").config()



const port=process.env.PORT || 3000




db.sync({force:false}).then(()=>{
    console.log("Database connected successfully")
    app.listen(port,()=>{

        console.log(`Server is running on port ${port}`)
        console.log(`worker ins running ${process.pid}`)
    
    })
 }).catch((err)=>{
    console.log("Error connecting to database",err)
})
}