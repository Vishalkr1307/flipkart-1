
    const {Redis}=require("ioredis")
    const {Worker,Queue}=require("bullmq")
    const {promisify}=require("util")
    const redisClient=new Redis({
        port:6379,
        host:"127.0.0.1"
    })
    
    const connectionOptions={
        connection:{
            host:"127.0.0.1",
            port:6379
        }
    }

    const get_async_connection=promisify(redisClient.get).bind(redisClient)
    const set_async_connection=promisify(redisClient.set).bind(redisClient)

    module.exports={get_async_connection,set_async_connection}
    
    
    
