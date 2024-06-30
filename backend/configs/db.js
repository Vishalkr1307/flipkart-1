const {Sequelize}=require("sequelize")
const db=new Sequelize("flipkart","root","5566",{
    dialect:"mysql",
    host:"localhost"
})

module.exports=db